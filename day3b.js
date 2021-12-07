const fs = require('fs');

diagnosticReport = () => {
  const diagnosticInput = fs.readFileSync('binary.txt', {encoding: 'utf8'})
  .split('\n')
  return diagnosticInput;
}
const dataLength = diagnosticReport()[0].length;

binaryDataRating = (diagnosticReport) => {
  const epsilon = Array(dataLength).fill(0);
  const gamma = Array(dataLength).fill(0);

  for (const row of diagnosticReport) {
    const bits = [...row];
    bits.forEach((bit, index) => {
      if (bit === "0") {
        epsilon[index]++;
      } else {
        gamma[index]++;
      }
    });
  }
  return {epsilon, gamma};
}
// console.log(binaryDataRating(diagnosticReport()))

oxygenGeneratorRating = (rows, index = 0) => {
  const { epsilon, gamma } = binaryDataRating(rows);
  let mostCommonBit = "1";
  if (epsilon[index] > gamma[index]) {
    mostCommonBit = "0";
  }
  const filtered = rows.filter((row) => row[index] === mostCommonBit);
  if (filtered.length === 1) {
    return filtered[0]
  }
  return oxygenGeneratorRating(filtered, index + 1)
}
const o2Rating = oxygenGeneratorRating(diagnosticReport());
//console.log(o2Rating);

co2ScrubberRating = (rows, index = 0) => {
  const { epsilon, gamma } = binaryDataRating(rows);
  let leastCommonBit = "0";
  if (epsilon[index] > gamma[index]) {
    leastCommonBit = "1";
  }
  const filtered = rows.filter((row) => row[index] === leastCommonBit);
  if (filtered.length === 1) {
    return filtered[0]
  }
  return co2ScrubberRating(filtered, index + 1)
}

function lifeSupportRating() {
  const oRating = oxygenGeneratorRating(diagnosticReport());
  const co2Rating = co2ScrubberRating(diagnosticReport());

  console.log(parseInt(oRating, 2) * parseInt(co2Rating, 2));
}
lifeSupportRating()
