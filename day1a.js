const fs = require('fs');

sonarDepthChangeData = () => {
  const sonarInput = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map((data) => parseInt(data, 10));
  return sonarInput;
}

depthIncreaseCounter = (sonarData) => {
  let depthIncreaseCount = 0;
  let index = 0;
  let count = sonarData.length;
  while (count > 0) {
    if (sonarData[index] < sonarData[index + 1]) {
      depthIncreaseCount++;
    }
    index++;
    count--;
  }
  return depthIncreaseCount;
}

const sonarData = sonarDepthChangeData();
console.log(depthIncreaseCounter(sonarData))
