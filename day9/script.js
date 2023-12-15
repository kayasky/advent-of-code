const fs = require('fs');
const input = fs.readFileSync('./day9/input.txt', 'utf8');

(() => {
  const histories = input.split('\n');
  const firstHistory = histories[1].split(' ').map(Number);
  const allSequences = calculateAllSequences(firstHistory);

  // console.log(allSequences);

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

  extrapolateNextValue(allSequences);

  function extrapolateNextValue(sequences) {
    // build an array with the last value of each sequence
    let lastValues = [];
    sequences.forEach(sequence => {
      lastValues.unshift(sequence[sequence.length - 1]);
    });

    
    const newLastValues = [0];

    lastValues.forEach((value, index) => {
      if (index) {
        newLastValues.push(value + newLastValues[index - 1]);
      }
    });

    console.log(newLastValues[newLastValues.length - 1]);
  }

})();