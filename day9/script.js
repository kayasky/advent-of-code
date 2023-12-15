const fs = require('fs');
const input = fs.readFileSync('./day9/input.txt', 'utf8');

(() => {
  const histories = input.split('\n');
  const answer = calculateAnswer(histories);
  console.log('Answer:\n', answer);

  function calculateAnswer(histories) {
    let finalNextValue = 0;
    let finalPreviousValue = 0;

    histories.forEach(history => {
      const historyInt = history.split(' ').map(Number);
      const allSequences = calculateAllSequences(historyInt);
      const nextValue = extrapolateNextValue(allSequences);
      const previousValue = extrapolatePreviousValue(allSequences);
      finalNextValue += nextValue;
      finalPreviousValue += previousValue;
    });

    return { finalNextValue, finalPreviousValue };
  }

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

  function extrapolateNextValue(sequences) {
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

    return newLastValues[newLastValues.length - 1];
  }

  function extrapolatePreviousValue(sequences) {
    let firstValues = [];

    sequences.forEach(sequence => {
      firstValues.unshift(sequence[0]);
    });

    const newFirstValues = [0];

    firstValues.forEach((value, index) => {
      if (index) {
        newFirstValues.push(value - newFirstValues[index - 1]);
      }
    });

    return newFirstValues[newFirstValues.length - 1];
  }

})();