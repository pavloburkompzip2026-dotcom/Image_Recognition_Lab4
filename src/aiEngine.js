const brain = require('brain.js');
const { generateDataset } = require('./datasetGenerator');

class VisionAIEngine {
  constructor() {
    this.net = null;
    this.isTrained = false;
  }

  trainModelBatch(epochs = 300, learningRate = 0.05) {
    const dataset = generateDataset();
    this.net = new brain.NeuralNetwork({ hiddenLayers: [16, 8], learningRate });
    this.net.train(dataset, { iterations: epochs, errorThresh: 0.005, log: false });
    this.isTrained = true;
    return true;
  }

  // Аналіз 9 HSL-векторів сітки 3x3
  processInputs(inputs, heuristicScores) {
    if (!this.isTrained) {
      this.trainModelBatch(100); // Авто-ініціалізація при відсутності навчання
    }

    const netOutput = this.net.run(inputs);

    let finalDesert = (netOutput.desert || 0) * 0.4 + (heuristicScores.desert / 13.5) * 0.6;
    let finalForest = (netOutput.forest || 0) * 0.4 + (heuristicScores.forest / 13.5) * 0.6;
    let finalWater = (netOutput.water || 0) * 0.4 + (heuristicScores.water / 13.5) * 0.6;

    const total = finalDesert + finalForest + finalWater || 1;
    finalDesert /= total; finalForest /= total; finalWater /= total;

    let maxVal = Math.max(finalWater, finalForest, finalDesert);
    let resultName = "Пустеля 🏜️";
    if (maxVal === finalWater) resultName = "Водойма 🌊";
    else if (maxVal === finalForest) resultName = "Густий ліс 🌲";

    return {
      resultName,
      probabilities: {
        water: Number((finalWater * 100).toFixed(1)),
        forest: Number((finalForest * 100).toFixed(1)),
        desert: Number((finalDesert * 100).toFixed(1))
      }
    };
  }
}

module.exports = VisionAIEngine;