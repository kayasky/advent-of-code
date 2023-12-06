const fs = require('fs');
const input = fs.readFileSync('./day6/input.txt', 'utf8');

(() => {
  function calculateAnswer(times, distances) {
    let answer = 1;

    times.forEach((time, index) => {
      let possibleAnswers = 0;
      let previousDistanceTravelled = 0;
      ({ previousDistanceTravelled, possibleAnswers, answer } = calculatePossibleAnswers(time, distances, index, previousDistanceTravelled, possibleAnswers, answer));
    });

    return answer;
  }

  console.time('calculateAnswer')

  // part 1
  const raceStats = input.split('\n');
  const times = raceStats[0].substring(raceStats[0].indexOf(':') + 1).split(' ').filter((time) => time !== '').map(item => parseInt(item));
  const distances = raceStats[1].substring(raceStats[1].indexOf(':') + 1).split(' ').filter((distance) => distance !== '').map(item => parseInt(item));
  let answer = 1;
  answer = calculateAnswer(times, distances);
  console.log(`The number of ways I can beat the record, multiplied is ${answer}`);

  // part 2
  const singleRaceTime = parseInt(raceStats[0].substring(raceStats[0].indexOf(':') + 1).replace(/\s/g, ''));
  const singleRaceDistance = parseInt(raceStats[1].substring(raceStats[1].indexOf(':') + 1).replace(/\s/g, ''));
  let singleRaceAnswer = 1;
  singleRaceAnswer = calculateAnswer([singleRaceTime], [singleRaceDistance]);
  console.log(`The number of ways I can beat the single race record, multiplied is ${singleRaceAnswer}`);

  console.timeEnd('calculateAnswer')
})();

function calculatePossibleAnswers(time, distances, index, previousDistanceTravelled, possibleAnswers, answer) {
  for (let buttonHoldTime = 1; buttonHoldTime <= time; buttonHoldTime++) {
    distanceTravelled = buttonHoldTime * (time - buttonHoldTime);

    if (isDistanceTrendingDown(distances, index, previousDistanceTravelled)) {
      buttonHoldTime = time;
    } else {
      previousDistanceTravelled = distanceTravelled;
    }

    if (isRecordBroken(distances, index)) {
      possibleAnswers += 1;
    }

    if (isButtonHeldForFullTimePeriod(buttonHoldTime, time)) {
      answer *= possibleAnswers;
    }
  }
  return { previousDistanceTravelled, possibleAnswers, answer };
}

function isButtonHeldForFullTimePeriod(buttonHoldTime, time) {
  return buttonHoldTime === time;
}

function isRecordBroken(distances, index) {
  return distanceTravelled > distances[index];
}

function isDistanceTrendingDown(distances, index, previousDistanceTravelled) {
  return distanceTravelled < distances[index] && distanceTravelled < previousDistanceTravelled;
}
