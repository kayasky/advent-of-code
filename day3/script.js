const fs = require('fs');
const input = fs.readFileSync('./day3/input.txt', 'utf8');

(() => {
  //const schematic = input.split('\n');
  const schematic = input.split('\n');

  schematic.forEach((row, index) => {
    console.log(`${row}\n`);

    if (index > 0 && index < schematic.length - 1) {
      //console.log(index);
    }
    const matcher = /[^A-Za-z 0-9.]/g;
    while ((match = matcher.exec(row)) != null) {
      const charIndex = match.index;
    
      if (row.charAt(charIndex - 1) !== '.') {
        //console.log('found a part number to the left the special character', row.charAt(charIndex - 1)); //left
        console.log(row.charAt(charIndex - 1));
      }
      if (row.charAt(charIndex + 1) !== '.') {
       // console.log('found a part number to the right of the special character', row.charAt(charIndex + 1)); //right
      }
      if (schematic[index - 1].charAt(charIndex) !== '.') {
       //console.log('found a part number just above the special character', schematic[index - 1].charAt(charIndex)); //above
      }
      if (schematic[index + 1].charAt(charIndex) !== '.') {
       // console.log('found a part number just below the special character', schematic[index + 1].charAt(charIndex)); //below
      }
      if (schematic[index - 1].charAt(charIndex - 1) !== '.') {
       // console.log('found a part number just above and to the left of the special character', schematic[index - 1].charAt(charIndex - 1)); //above and left
      }
      if (schematic[index - 1].charAt(charIndex + 1) !== '.') {
       // console.log('found a part number just above and to the right of the special character', schematic[index - 1].charAt(charIndex + 1)); //above and right
      }
      if (schematic[index + 1].charAt(charIndex - 1) !== '.') {
       // console.log('found a part number just below and to the left of the special character', schematic[index + 1].charAt(charIndex - 1)); //below and left
      }
      if (schematic[index + 1].charAt(charIndex + 1) !== '.') {
       // console.log('found a part number just below and to the right of the special character', schematic[index + 1].charAt(charIndex + 1)); //below and right
      }
    }
  });
})();