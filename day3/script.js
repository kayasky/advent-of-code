const fs = require('fs');
const input = fs.readFileSync('./day3/input.txt', 'utf8');

(() => {
  //const schematic = input.split('\n');
  const schematic = input.split('\n');
  let sum = 0;

  schematic.forEach((row, index) => {
    //console.log(`${row}\n`);

    const matcher = /[^A-Za-z 0-9.]/g;
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

      if (row.charAt(charIndex - 1) !== '.') {
        toLeft = checkStringBackwards(row, charIndex - 1);
      }
      if (row.charAt(charIndex + 1) !== '.') {
        toRight = checkStringForwards(row, charIndex + 1);
      }
      if (schematic[index - 1].charAt(charIndex) !== '.') {
        above = schematic[index - 1].charAt(charIndex);
      }
      if (schematic[index - 1].charAt(charIndex - 1) !== '.') {
        aboveLeft = checkStringBackwards(schematic[index - 1], charIndex - 1);
      }
      if (schematic[index - 1].charAt(charIndex + 1) !== '.') {
        aboveRight = checkStringForwards(schematic[index - 1], charIndex + 1);
      }
      if (schematic[index + 1].charAt(charIndex) !== '.') {
        below = schematic[index + 1].charAt(charIndex);
      }
      if (schematic[index + 1].charAt(charIndex - 1) !== '.') {
        belowLeft = checkStringBackwards(schematic[index + 1], charIndex - 1);
      }
      if (schematic[index + 1].charAt(charIndex + 1) !== '.') {
        belowRight = checkStringForwards(schematic[index + 1], charIndex + 1);
      }

      const aboveNum = parseInt(`${aboveLeft}${above}${aboveRight}` || '0', 10);
      const belowNum = parseInt(`${belowLeft}${below}${belowRight}` || '0', 10);
      const leftNum = parseInt(toLeft || '0', 10);
      const rightNum = parseInt(toRight || '0', 10);

      sum += aboveNum + belowNum + leftNum + rightNum;
    }
  });

  console.log(`Sum: ${sum}`);

  function checkStringBackwards(str, index) {
    let result = '';
    while (index >= 0 && !isNaN(parseInt(str[index], 10))) {
      result = str[index] + result;
      index--;
    }
    return result;
  }

  function checkStringForwards(str, index) {
    let result = '';
    while (index < str.length && !isNaN(parseInt(str[index], 10))) {
      result += str[index];
      index++;
    }
    return result;
  }

})();