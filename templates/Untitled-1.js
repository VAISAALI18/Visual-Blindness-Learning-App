
const quizzes = {
  1: [
  {
    question: "Which color is hardest to distinguish for someone with Protanopia?",
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: "Red",
    explanation: "Protanopia results in poor red color perception."
  },
  {
    question: "Which color remains visible even in Tritanopia?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Red",
    explanation: "Tritanopia primarily affects blue-yellow discrimination; red remains mostly unaffected."
  },
  {
    question: "What primary color is missing in Deuteranopia?",
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: "Green",
    explanation: "Deuteranopia means the green cones are missing or malfunctioning."
  },
  {
    question: "Which color is often confused with red in Deuteranomaly?",
    options: ["Blue", "Yellow", "Green", "Orange"],
    answer: "Green",
    explanation: "People with Deuteranomaly confuse red and green shades."
  },
  {
    question: "Which color is typically seen correctly in most types of color blindness?",
    options: ["Yellow", "Red", "Green", "Blue"],
    answer: "Yellow",
    explanation: "Yellow perception is less affected across many types of color blindness."
  },
  {
    question: "Which two colors blend together for someone with red-green color blindness?",
    options: ["Red and Green", "Blue and Yellow", "Red and Blue", "Green and Yellow"],
    answer: "Red and Green",
    explanation: "Red-green color blindness causes these colors to appear similar."
  },
  {
    question: "People with Tritanopia confuse blue with which color?",
    options: ["Green", "Yellow", "Purple", "Orange"],
    answer: "Green",
    explanation: "Tritanopia causes confusion between blue and green tones."
  },
  {
    question: "In a typical Ishihara test plate, numbers are hidden to those with which condition?",
    options: ["Astigmatism", "Color blindness", "Myopia", "Hyperopia"],
    answer: "Color blindness",
    explanation: "Ishihara plates are used specifically to detect color blindness."
  },
  {
    question: "Color blindness mainly affects the perception of which feature?",
    options: ["Brightness", "Sharpness", "Color", "Movement"],
    answer: "Color",
    explanation: "Color blindness primarily impacts the ability to distinguish certain colors."
  },
  {
    question: "The term 'Daltonism' is historically used to describe which condition?",
    options: ["Astigmatism", "Color blindness", "Cataract", "Glaucoma"],
    answer: "Color blindness",
    explanation: "Daltonism is another name for color blindness, named after John Dalton."
  },
],

  2: [
    {
      question: "Which color is most commonly confused with red in Protanopia?",
      options: ["Green", "Blue", "Yellow", "Purple"],
      answer: "Green",
      explanation: "Protanopia affects the perception of red light, making reds and greens hard to differentiate."
    },
    {
      question: "What is Deuteranopia?",
      options: ["Blue blindness", "Green blindness", "Red blindness", "Yellow blindness"],
      answer: "Green blindness",
      explanation: "Deuteranopia is a form of color blindness where green cones are missing."
    },
    {
      question: "People with Tritanopia have difficulty seeing which color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      answer: "Blue",
      explanation: "Tritanopia is the absence of blue cone cells."
    },
    {
      question: "In red-green color blindness, which two colors appear similar?",
      options: ["Red and Green", "Blue and Yellow", "Black and White", "Orange and Purple"],
      answer: "Red and Green",
      explanation: "Red-green color blindness makes reds and greens indistinguishable."
    },
    {
      question: "What is the Ishihara test used for?",
      options: ["Vision sharpness", "Color blindness detection", "Eye pressure", "Cataract detection"],
      answer: "Color blindness detection",
      explanation: "The Ishihara test detects red-green color deficiencies."
    },
    {
      question: "In normal color vision, what colors form white when mixed?",
      options: ["Red, Green, Blue", "Blue, Yellow, Red", "Green, Yellow, Purple", "Black, White, Gray"],
      answer: "Red, Green, Blue",
      explanation: "Combining Red, Green, and Blue light creates white light."
    },
    {
      question: "Which profession often requires a color vision test?",
      options: ["Pilot", "Writer", "Actor", "Musician"],
      answer: "Pilot",
      explanation: "Pilots need accurate color perception for reading instruments and signals."
    },
    {
      question: "What kind of lenses can help colorblind individuals?",
      options: ["EnChroma", "Progressive", "Photochromic", "Bifocal"],
      answer: "EnChroma",
      explanation: "EnChroma lenses are specially designed for color vision deficiencies."
    },
    {
      question: "Which gender is more likely to be colorblind?",
      options: ["Male", "Female", "Both equally"],
      answer: "Male",
      explanation: "Color blindness is X-linked, making it more common in males."
    },
    {
      question: "Colorblindness is mostly...",
      options: ["Genetic", "Infectious", "Environmental", "Diet-related"],
      answer: "Genetic",
      explanation: "Color blindness is usually inherited genetically."
    },
  ],
  3: [
  {
    question: "Match: Protanopia - ?",
    options: ["Poor Red Perception", "Poor Blue Perception", "Poor Green Perception", "Poor Yellow Perception"],
    answer: "Poor Red Perception",
    explanation: "Protanopia results in difficulty distinguishing red hues."
  },
  {
    question: "Match: Deuteranopia - ?",
    options: ["Poor Red Perception", "Poor Green Perception", "Poor Blue Perception", "Normal Color Vision"],
    answer: "Poor Green Perception",
    explanation: "Deuteranopia involves the absence of green cones."
  },
  {
    question: "Match: Tritanopia - ?",
    options: ["Poor Green Perception", "Poor Red Perception", "Poor Blue Perception", "Enhanced Red Perception"],
    answer: "Poor Blue Perception",
    explanation: "Tritanopia results in difficulty distinguishing blue and yellow."
  },
  {
    question: "Match: Ishihara Plates - ?",
    options: ["Detect Color Blindness", "Improve Vision", "Test Peripheral Vision", "Correct Nearsightedness"],
    answer: "Detect Color Blindness",
    explanation: "Ishihara plates are designed to detect red-green color deficiencies."
  },
  {
    question: "Match: Daltonism - ?",
    options: ["Color Blindness", "Short-sightedness", "Night Blindness", "Tunnel Vision"],
    answer: "Color Blindness",
    explanation: "Daltonism is another term for color blindness."
  },
  {
    question: "Match: EnChroma Glasses - ?",
    options: ["Assist Color Vision", "Magnify Objects", "Reduce Sunlight Glare", "Strengthen Night Vision"],
    answer: "Assist Color Vision",
    explanation: "EnChroma glasses help enhance color discrimination for colorblind individuals."
  },
  {
    question: "Match: Red-Green Confusion - ?",
    options: ["Protanopia and Deuteranopia", "Tritanopia and Achromatopsia", "Astigmatism", "Night Blindness"],
    answer: "Protanopia and Deuteranopia",
    explanation: "Red-green confusion is characteristic of Protanopia and Deuteranopia."
  },
  {
    question: "Match: Blue-Yellow Confusion - ?",
    options: ["Tritanopia", "Protanopia", "Deuteranopia", "Hyperopia"],
    answer: "Tritanopia",
    explanation: "Tritanopia causes confusion between blue and yellow hues."
  },
  {
    question: "Match: Genetic Condition - ?",
    options: ["Color Blindness", "Astigmatism", "Presbyopia", "Cataract"],
    answer: "Color Blindness",
    explanation: "Most types of color blindness are inherited genetically."
  },
  {
    question: "Match: Cone Cells Affected - ?",
    options: ["Color Blindness", "Near-sightedness", "Far-sightedness", "Glaucoma"],
    answer: "Color Blindness",
    explanation: "Color blindness results from defects in the cone cells of the retina."
  },
],
};
