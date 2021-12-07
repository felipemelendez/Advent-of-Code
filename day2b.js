const fs = require('fs');

sonarDepthChangeData = () => {
  const sonarInput = fs.readFileSync('commands.txt', 'utf8')
    .split('\n')
    .map(line => line.split(' '))
  return sonarInput;
}

submarineControls2 = (submarineCommands) => {
  let aim = 0;
  let horizontalPosition = 0;
  let verticalPosition = 0;
  submarineCommands.forEach(command => {
    let currentCommandDirection = command[0];
    let currentCommandAmount = parseInt(command[1])
    if (currentCommandDirection === 'forward') {
      horizontalPosition += currentCommandAmount;
      verticalPosition += aim * currentCommandAmount;
    } else if (currentCommandDirection === 'down') {
      aim += currentCommandAmount;
    } else {
      aim -= currentCommandAmount;
    }
  })
  return verticalPosition * horizontalPosition;
}

const submarineCommands = sonarDepthChangeData();
console.log(submarineControls2(submarineCommands))
