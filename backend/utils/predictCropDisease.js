import path from "path";
import * as tf from "@tensorflow/tfjs-node";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("../models/metadata.json");

async function loadModel() {
  const model = await tf.loadLayersModel(
    `file://${path.join(import.meta.dirname, "../models/model.json")}`
  );
  //   console.log("Model loaded");
  return model;
}

export default async function predictCropDisease(imageBuffer) {
  if (!imageBuffer) {
    return "No image uploaded";
  }

  const imageTensor = tf.node
    .decodeImage(imageBuffer)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
    .div(tf.scalar(255.0));

  const model = await loadModel();

  const modelPrediction = model.predict(imageTensor);
  // maxPredictionIndex is the index of the most probable class.
  let maxPredictionIndex,
    maxPredictionValue = -Infinity;
  // console.log(modelPrediction.array()); //.array method returns a promise

  // modelPrediction.array().then((predictions) => {
  //   console.log(predictions); //predictions is a nested array whose first element is array itself
  //   // with all the prediction values of all the classes.
  //   // greater the prediction value, higher the chance that the respective class is the class of
  //   // the supplied image
  // });

  const predictions = await modelPrediction.array();
  // console.log(predictions[0]);
  predictions[0].forEach((predictionValue, index) => {
    if (index === 0) {
      maxPredictionIndex = index;
    }
    if (predictionValue > maxPredictionValue) {
      maxPredictionValue = predictionValue;
      maxPredictionIndex = index;
    }
  });

  //   console.log(predictions);
  return data.labels[maxPredictionIndex];
}
