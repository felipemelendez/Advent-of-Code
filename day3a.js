const fs = require('fs');

diagnosticReport = () => {
  const diagnosticInput = fs.readFileSync('binary.txt', 'utf8')
  .split('\n')
  return diagnosticInput;
}
// console.log(diagnosticReport());

powerConsumptionRate = (diagnosticReport) => {
  let gamma = "";
  let epsilon = "";
  const numberOfinputs = diagnosticReport.length;
  const lengthOfbinaryNumber = diagnosticReport[0].length;
  let binaryTracker = {};
  for (let i = 0; i < numberOfinputs; i++) {
    let currentBinaryNum = diagnosticReport[i].split('');
    currentBinaryNum.forEach((binaryNum, index) => {
        if (binaryTracker[index] === undefined) {
          if (binaryNum === '0') {
            binaryTracker[index] = 0;
          } else {
            binaryTracker[index] = 1;
          }
        } else if (binaryNum === '0') {
          binaryTracker[index] += 0;
        } else {
          binaryTracker[index] += 1;
        }
    })
  }
  console.log({binaryTracker})
  for (key in binaryTracker) {
      if (binaryTracker[key] > numberOfinputs/2) {
        gamma += '1';
        epsilon += '0'
      } else {
        gamma += '0';
        epsilon += '1'
      }
  }
  // console.log({gamma, epsilon});
  const binaryGamma = Number('0b'.concat(gamma));
  const binaryEpsilon = Number('0b'.concat(epsilon));
  // console.log({binaryGamma, binaryEpsilon});
  return binaryGamma * binaryEpsilon;
}

console.log(powerConsumptionRate(diagnosticReport()));
