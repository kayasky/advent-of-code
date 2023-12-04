const fs = require('fs');
const input = fs.readFileSync('./day4/input.txt', 'utf8');

// part 1
(() => {
  const pileOfScratchCards = input.split('\n');
  let points = 0;

  const calculatePoints = (winningNumbers, myNumbers) => {
    const myWinningNumbers = [...winningNumbers.intersection(myNumbers)];
    let pointsForThisCard = 0;
    if (myWinningNumbers.length) {
      pointsForThisCard = Math.pow(2, myWinningNumbers.length - 1);
    }
    return pointsForThisCard;
  };

  const getSet = (cardNumbers) => {
    return new Set(cardNumbers.split(' ').filter((number) => number !== ''));
  }

  pileOfScratchCards.forEach((card) => {
    const splitCard = card.split(' | ');
    const winningNumbers = getSet(splitCard[0].substring(8));
    const myNumbers = getSet(splitCard[1]);
    points += calculatePoints(winningNumbers, myNumbers);
  });

  console.log(`I won ${points} points!`);
})();

// part 2
(() => {
  
})();