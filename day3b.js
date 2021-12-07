const fs = require('fs');

diagnosticReport = () => {
  const diagnosticInput = fs.readFileSync('binary.txt', {encoding: 'utf8'})
  .split('\n')
  .filter((x) => Boolean(x))
  return diagnosticInput;
}
const dataLength = diagnosticReport()[0].length;

binaryDataRating = (diagnosticReport) => {
  const epsilon = Array(dataLength).fill(0);
  const gamma = Array(dataLength).fill(0);

  for (const line of diagnosticReport) {
    const bits = [...line];
    bits.forEach((bit, index) => {
      if (bit === "0") {
        epsilon[index]++;
      } else {
        gamma[index]++;
      }
    });
  }
  // -------  Different method to compute Day 1 --------- //
  let gammaRate = ""; // most common bits
  let epsilonRate = ""; // least common bits

  for (let i = 0; i < dataLength; i++) {
    let bit = 0;
    if (gamma[i] > epsilon[i]) {
      bit = 1;
    }
    gammaRate += bit;
    epsilonRate += bit === 1 ? 0 : 1;
  }
  // console.log(parseInt(gammaRate, 2));
  // console.log(parseInt(epsilonRate, 2));
  // console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))

  return {epsilon, gamma};
}
// console.log(binaryDataRating(diagnosticReport()))

oxygenGeneratorRating = (lines, index = 0) => {
  const { epsilon, gamma } = binaryDataRating(lines);
  let mostCommonBit = "1";
  if (epsilon[index] > gamma[index]) {
    mostCommonBit = "0";
  }
  const filtered = lines.filter((line) => line[index] === mostCommonBit);
  if (filtered.length === 1) {
    return filtered[0]
  }
  return oxygenGeneratorRating(filtered, index + 1)
}
const o2Rating = oxygenGeneratorRating(diagnosticReport());
//console.log(o2Rating);

co2ScrubberRating = (lines, index = 0) => {
  const { epsilon, gamma } = binaryDataRating(lines);
  let leastCommonBit = "0";
  if (epsilon[index] > gamma[index]) {
    leastCommonBit = "1";
  }
  const filtered = lines.filter((line) => line[index] === leastCommonBit);
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
