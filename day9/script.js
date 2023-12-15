const fs = require('fs');
const input = fs.readFileSync('./day9/input.txt', 'utf8');

(() => {
  const histories = input.split('\n');
  const firstHistory = histories[2].split(' ').map(Number);
  const allSequences = calculateAllSequences(firstHistory);

  console.log(allSequences);

  function calculateAllSequences(history) {
    let sequences = [history];
    calculateNextSequence(history);

    function calculateNextSequence(history) {
      let nextSequence = [];

      for (let i = 1; i < history.length; i++) {
        nextSequence.push(history[i] - history[i - 1]);
        if (nextSequence.length === history.length - 1) {
          sequences.push(nextSequence);
          if (nextSequence.every(item => item === 0)) {
            break;
          } else {
            calculateNextSequence(nextSequence);
          }
        }
      }
    }
    return sequences;
  }

})();