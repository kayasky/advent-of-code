const fs = require('fs');
const input = fs.readFileSync('./day6/input.txt', 'utf8');

// part 1
(() => {
  const raceStats = input.split('\n');
  const times = raceStats[0].substring(raceStats[0].indexOf(':') + 1).split(' ').filter((time) => time !== '').map(item => parseInt(item));
  const distances = raceStats[1].substring(raceStats[1].indexOf(':') + 1).split(' ').filter((distance) => distance !== '').map(item => parseInt(item));
  let answer = 1;

  times.forEach((time, index) => {
    let possibleAnswers = 0;
    for (let buttonHoldTime = 0; buttonHoldTime <= time; buttonHoldTime++) {
      distanceTravelled = buttonHoldTime * (time - buttonHoldTime);
      if (distanceTravelled > distances[index]) {
        possibleAnswers += 1;
      }

      if (buttonHoldTime === time) {
        answer *= possibleAnswers;
      }
    }
  });

  console.log(answer);
  
})();