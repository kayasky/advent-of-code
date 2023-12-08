const fs = require('fs');
const input = fs.readFileSync('./day7/input.txt', 'utf8');

(() => {
  const hands = input.split('\n');
  console.log(hands);
})();