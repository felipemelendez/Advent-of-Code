const fs = require('fs');

sonarDepthChangeData = () => {
  const sonarInput = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map((data) => parseInt(data, 10));
  return sonarInput;
}

slidingWindowDepthCount = (sonarData) => {
  let currentWindowSum = 0;
  let previousWindowSum = 0;
	let depthIncreaseCount = 0;
	let windowStart = 0;
  let windowEnd = 2;

  while (windowEnd != sonarData.length) {
    currentWindowSum = sonarData[windowStart] + sonarData[windowStart + 1] + sonarData[windowEnd];
    if (currentWindowSum > previousWindowSum) {
      depthIncreaseCount++;
    }
    windowStart++;
    windowEnd++;
    previousWindowSum = currentWindowSum;
	}
	return depthIncreaseCount - 1;
}

const sonarData = sonarDepthChangeData();
console.log(slidingWindowDepthCount(sonarData))
