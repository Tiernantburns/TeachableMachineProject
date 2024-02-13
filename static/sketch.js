// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */





// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/nKZTktmtm/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


// BOOLEAN TO CLASSIFY VIDEO
 let videoIsOn= true;


// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}



function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}
// Nutrition facts data
const nutritionFacts = {
  "Apple": {
    Calories: "95 Calories",
    Carbohydrates: "25 Grams",
    DietaryFiber: "4 Grams",
    Sugars: "19 Grams",
    Protein: "0.5 Grams",
    Fat: "Less than 0.3 grams"
  },
  "Banana": {
    Calories: "105 calories",
    Carbohydrates: "27 grams",
    DietaryFiber: "3 grams",
    Sugars: "14 grams",
    Protein: "1.3 grams",
    Fat: "less than 0.5 grams"
  },
  "Orange": {
    Calories: "62 calories",
    Carbohydrates: "15.4 grams",
    DietaryFiber: "3.1 grams",
    Sugars: "12.2 grams",
    Protein: "1.2 grams",
    Fat: "less than 0.3 grams"
  },
  "Strawberry": {
    Calories: "49 Calories",
    Carbohydrates: "11.7 grams",
    DietaryFiber: "3 grams",
    Sugars: "7.4 grams",
    Protein: "1 gram",
    Fat: "0.5 grams"
  },

  "Blueberry": {
    Calories: "84 Calories",
    Carbohydrates: "21.5 grams",
    DietaryFiber: "3.6 grams",
    Sugars: "14.7 grams",
    Protein: "1.1 grams",
    Fat: "0.5 grams"
  }
};

// Function to display nutrition facts
function displayNutrition(fruitName) {
  const facts = nutritionFacts[fruitName];
  const nutritionDiv = document.getElementById('nutrition-facts');
  if (facts) {
    let info = `<strong>${fruitName} Nutrition:</strong><br>`;
    for (const key in facts) {
      info += `${key}: ${facts[key]}<br>`;
    }
    nutritionDiv.innerHTML = info; // Update the div's content
  } else {
    nutritionDiv.innerHTML = "No nutrition facts available.";
  }
}
function draw() {
  background(0);
  // Draw the video
  if(videoIsOn) {
    image(flippedVideo, 0, 0);
   // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }
  else{
    background(50);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text("Click to start video", width / 2, height / 2);
  }
}

function mousePressed()  {
  videoIsOn = !videoIsOn;
  if(videoIsOn) video.play();
  else video.stop();
 }


// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  displayNutrition(label);
  // Classifiy again!
  classifyVideo();
}
