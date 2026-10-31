function generateDataset() {
  const dataset = [];
  for (let i = 0; i < 100; i++) {
    let inpW = {}, inpF = {}, inpD = {};
    for (let z = 0; z < 9; z++) {
      inpW[`h_${z}`] = (180 + Math.random() * 50) / 360; inpW[`s_${z}`] = 0.5; inpW[`l_${z}`] = 0.4;
      inpF[`h_${z}`] = (70 + Math.random() * 80) / 360;  inpF[`s_${z}`] = 0.5; inpF[`l_${z}`] = 0.3;
      inpD[`h_${z}`] = (20 + Math.random() * 30) / 360;  inpD[`s_${z}`] = 0.5; inpD[`l_${z}`] = 0.5;
    }
    dataset.push({ input: inpW, output: { water: 1 } });
    dataset.push({ input: inpF, output: { forest: 1 } });
    dataset.push({ input: inpD, output: { desert: 1 } });
  }
  return dataset;
}

module.exports = { generateDataset };