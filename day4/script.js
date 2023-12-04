const fs = require('fs');
const input = fs.readFileSync('./day4/input.txt', 'utf8');

(() => {
  const pileOfScratchCards = input.split('\n');
  let points = 0;

  pileOfScratchCards.forEach((card) => {
    const splitCard = card.split(' | ')
    const winningNumbers = new Set(splitCard[0].substring(8).split(' ').filter((number) => number !== ''));
    const myNumbers = new Set(splitCard[1].split(' ').filter((number) => number !== ''));
    const myWinningNumbers = [...winningNumbers.intersection(myNumbers)]
    let pointsForThisCard = 0;
    if (myWinningNumbers.length) {
      pointsForThisCard = Math.pow(2, myWinningNumbers.length - 1);
    }
    points += pointsForThisCard;
  });

  console.log(`I won ${points} points!`);
})();