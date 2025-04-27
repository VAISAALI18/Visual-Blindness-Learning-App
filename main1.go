package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"image"
	"image/color"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/disintegration/imaging"
)

var outputDir = "output"

// Transformation matrices (same as before)
var (
	protanopiaMatrix    = [3][3]float64{{0.56667, 0.43333, 0}, {0.55833, 0.44167, 0}, {0, 0.24167, 0.75833}}
	deuteranopiaMatrix  = [3][3]float64{{0.625, 0.375, 0}, {0.7, 0.3, 0}, {0, 0.3, 0.7}}
	tritanopiaMatrix    = [3][3]float64{{0.95, 0.05, 0}, {0, 0.43333, 0.56667}, {0, 0.475, 0.525}}
	protanomalyMatrix   = [3][3]float64{{0.816, 0.184, 0}, {0.333, 0.667, 0}, {0, 0.125, 0.875}}
	deuteranomalyMatrix = [3][3]float64{{0.8, 0.2, 0}, {0.258, 0.742, 0}, {0, 0.142, 0.858}}
	tritanomalyMatrix   = [3][3]float64{{0.967, 0.033, 0}, {0, 0.733, 0.267}, {0, 0.183, 0.817}}
	achromatopsiaMatrix = [3][3]float64{{0.299, 0.587, 0.114}, {0.299, 0.587, 0.114}, {0.299, 0.587, 0.114}}
	monochromacyMatrix  = [3][3]float64{{0.33, 0.33, 0.33}, {0.33, 0.33, 0.33}, {0.33, 0.33, 0.33}}
)

func clamp(value float64) float64 {
	if value < 0 {
		return 0
	}
	if value > 255 {
		return 255
	}
	return value
}

func simulateColorBlindness(img image.Image, matrix [3][3]float64) image.Image {
	bounds := img.Bounds()
	out := image.NewRGBA(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			originalColor := color.RGBAModel.Convert(img.At(x, y)).(color.RGBA)
			r, g, b := float64(originalColor.R), float64(originalColor.G), float64(originalColor.B)

			newR := clamp(r*matrix[0][0] + g*matrix[0][1] + b*matrix[0][2])
			newG := clamp(r*matrix[1][0] + g*matrix[1][1] + b*matrix[1][2])
			newB := clamp(r*matrix[2][0] + g*matrix[2][1] + b*matrix[2][2])

			out.Set(x, y, color.RGBA{uint8(newR), uint8(newG), uint8(newB), originalColor.A})
		}
	}
	return out
}

func daltonize(img image.Image, cbMatrix [3][3]float64) image.Image {
	bounds := img.Bounds()
	out := image.NewRGBA(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			originalColor := color.RGBAModel.Convert(img.At(x, y)).(color.RGBA)
			r, g, b := float64(originalColor.R), float64(originalColor.G), float64(originalColor.B)

			simR := clamp(r*cbMatrix[0][0] + g*cbMatrix[0][1] + b*cbMatrix[0][2])
			simG := clamp(r*cbMatrix[1][0] + g*cbMatrix[1][1] + b*cbMatrix[1][2])
			simB := clamp(r*cbMatrix[2][0] + g*cbMatrix[2][1] + b*cbMatrix[2][2])

			errR := r - simR
			errG := g - simG
			errB := b - simB

			newR := clamp(r + errR*0.6)
			newG := clamp(g + errG*0.6)
			newB := clamp(b + errB*0.6)

			out.Set(x, y, color.RGBA{uint8(newR), uint8(newG), uint8(newB), originalColor.A})
		}
	}
	return out
}

func handleUpload(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Error reading file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	imgData, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Error reading image", http.StatusInternalServerError)
		return
	}

	src, err := imaging.Decode(bytes.NewReader(imgData))
	if err != nil {
		http.Error(w, "Error decoding image", http.StatusInternalServerError)
		return
	}

	simulations := map[string][3][3]float64{
		"protanopia":    protanopiaMatrix,
		"deuteranopia":  deuteranopiaMatrix,
		"tritanopia":    tritanopiaMatrix,
		"protanomaly":   protanomalyMatrix,
		"deuteranomaly": deuteranomalyMatrix,
		"tritanomaly":   tritanomalyMatrix,
		"achromatopsia": achromatopsiaMatrix,
		"monochromacy":  monochromacyMatrix,
	}

	os.MkdirAll(outputDir, 0755)

	var imageURLs []string
	for name, matrix := range simulations {
		result := simulateColorBlindness(src, matrix)
		outputPath := filepath.Join(outputDir, name+".jpg")
		imaging.Save(result, outputPath)
		imageURLs = append(imageURLs, "/output/"+name+".jpg")
	}

	// Daltonized
	dalton := daltonize(src, protanopiaMatrix)
	daltonPath := filepath.Join(outputDir, "daltonized.jpg")
	imaging.Save(dalton, daltonPath)
	imageURLs = append(imageURLs, "/output/daltonized.jpg")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string][]string{"images": imageURLs})
}

func setupStaticHandlers() {
	fs := http.FileServer(http.Dir(outputDir))
	http.Handle("/output/", http.StripPrefix("/output/", fs))
}

func renderTemplate(w http.ResponseWriter, tmpl string, data interface{}) {
	t, err := template.ParseFiles(fmt.Sprintf("%s.html", tmpl))
	if err != nil {
		http.Error(w, "Error loading page", http.StatusInternalServerError)
		return
	}
	t.Execute(w, data)
}

func visualizeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		handleUpload(w, r)
		return
	}
	renderTemplate(w, "visualize", nil)
}

func main() {
	if err := os.MkdirAll(outputDir, os.ModePerm); err != nil {
		log.Fatalf("Failed to create output directory: %v", err)
	}

	setupStaticHandlers()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, "index", nil)
	})
	http.HandleFunc("/learn", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, "learn", nil)
	})
	http.HandleFunc("/quiz", func(w http.ResponseWriter, r *http.Request) {
		renderTemplate(w, "quiz", nil)
	})
	http.HandleFunc("/visualize", visualizeHandler)

	fmt.Println("🚀 Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
