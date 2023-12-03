const fs = require('fs');
const input = fs.readFileSync('./day3/input.txt', 'utf8');

(() => {
  const schematic = input.split('\n');
  let sum = 0;
  let gearRatiosSum = 0;
  const foundPartIndices = [];

  schematic.forEach((row, rowIndex) => {
    const matcher = /[^0-9.]/g;
    while ((match = matcher.exec(row)) != null) {
      const charIndex = match.index;
      let toLeft = '';
      let toRight = '';
      let above = '';
      let below = '';
      let aboveLeft = '';
      let aboveRight = '';
      let belowLeft = '';
      let belowRight = '';

      function checkAndPush(row, charIndex, direction) {
        let foundNumberDetails;
        if (direction === 'backwards') {
          foundNumberDetails = checkStringBackwards(row, charIndex);
        } else if (direction === 'forwards') {
          foundNumberDetails = checkStringForwards(row, charIndex);
        } else {
          foundNumberDetails = { result: row.charAt(charIndex), numIndex: charIndex };
        }
        if (foundPartIndices.indexOf([rowIndex, foundNumberDetails.numIndex]) === -1) {
          foundPartIndices.push([rowIndex, foundNumberDetails.numIndex]);
          return foundNumberDetails.result;
        }
        return null;
      }

      if (!isNaN(parseInt(row.charAt(charIndex - 1), 10))) {
        toLeft = checkAndPush(row, charIndex - 1, 'backwards');
      }
      if (!isNaN(parseInt(row.charAt(charIndex + 1), 10))) {
        toRight = checkAndPush(row, charIndex + 1, 'forwards');
      }
      if (!isNaN(parseInt(schematic[rowIndex - 1].charAt(charIndex), 10))) {
        above = checkAndPush(schematic[rowIndex - 1], charIndex);
      }
      if (!isNaN(parseInt(schematic[rowIndex - 1].charAt(charIndex - 1), 10))) {
        aboveLeft = checkAndPush(schematic[rowIndex - 1], charIndex - 1, 'backwards');
      }
      if (!isNaN(parseInt(schematic[rowIndex - 1].charAt(charIndex + 1), 10))) {
        aboveRight = checkAndPush(schematic[rowIndex - 1], charIndex + 1, 'forwards');
      }
      if (!isNaN(parseInt(schematic[rowIndex + 1].charAt(charIndex), 10))) {
        below = checkAndPush(schematic[rowIndex + 1], charIndex);
      }
      if (!isNaN(parseInt(schematic[rowIndex + 1].charAt(charIndex - 1), 10))) {
        belowLeft = checkAndPush(schematic[rowIndex + 1], charIndex - 1, 'backwards');
      }
      if (!isNaN(parseInt(schematic[rowIndex + 1].charAt(charIndex + 1), 10))) {
        belowRight = checkAndPush(schematic[rowIndex + 1], charIndex + 1, 'forwards');
      }

      const leftNum = parseInt(toLeft || '0', 10);
      const rightNum = parseInt(toRight || '0', 10);
      let aboveNum = 0;
      let belowNum = 0;
      let aboveLeftNum = 0;
      let aboveRightNum = 0;
      let belowLeftNum = 0;
      let belowRightNum = 0;

      if (above !== '') {
        aboveNum = parseInt(`${aboveLeft}${above}${aboveRight}` || '0', 10);
      } else {
        aboveLeftNum = parseInt(aboveLeft || '0', 10);
        aboveRightNum = parseInt(aboveRight || '0', 10);
      }

      if (below !== '') {
        belowNum = parseInt(`${belowLeft}${below}${belowRight}` || '0', 10);
      } else {
        belowLeftNum = parseInt(belowLeft || '0', 10);
        belowRightNum = parseInt(belowRight || '0', 10);
      }

      // part 2
      if (row[charIndex] === '*') {
        const nonZeroNeighbours = [leftNum, rightNum, aboveNum, belowNum, aboveLeftNum, aboveRightNum, belowLeftNum, belowRightNum].filter((num) => num !== 0);
        if (nonZeroNeighbours.length === 2) {
          gearRatiosSum += nonZeroNeighbours[0] * nonZeroNeighbours[1];
        }
      }

      // part 1
      sum += aboveNum + belowNum + leftNum + rightNum + aboveLeftNum + aboveRightNum + belowLeftNum + belowRightNum;
    }
  });

  console.log(`Sum of all Part Numbers: ${sum}`);
  console.log(`Sum of all Gear Ratios: ${gearRatiosSum}`);

  function checkStringBackwards(row, index) {
    let result = '';
    while (index >= 0 && !isNaN(parseInt(row[index], 10))) {
      result = row[index] + result;
      index--;
    }
    return { result, numIndex: index + 1 };
  }

  function checkStringForwards(row, index) {
    let result = '';
    while (index < row.length && !isNaN(parseInt(row[index], 10))) {
      result += row[index];
      index++;
    }
    return { result, numIndex: index - 1 };
  }

})();