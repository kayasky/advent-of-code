const fs = require('fs');
const input = fs.readFileSync('./day4/input.txt', 'utf8');

// part 1
(() => {
  const pileOfScratchCards = input.split('\n');
  let wonCards = [];
  let points = 0;
  let totalCards = pileOfScratchCards.length;

  const calculatePoints = (winningNumbers, myNumbers, currentOriginalIndex, cards) => {
    const myWinningNumbers = [...winningNumbers.intersection(myNumbers)];
    let pointsForThisCard = 0;
    totalCards += 1;
    if (myWinningNumbers.length) {
      pointsForThisCard = Math.pow(2, myWinningNumbers.length - 1);
      wonCards = cards.slice(currentOriginalIndex + 1, currentOriginalIndex + myWinningNumbers.length + 1);
      calculateAnswer(wonCards)
    }
    return pointsForThisCard;
  };

  const getSet = (cardNumbers) => {
    return new Set(cardNumbers.split(' ').filter((number) => number !== ''));
  }

  points = calculateAnswer(pileOfScratchCards);

  function calculateAnswer(cards) {
    let totalPoints = 0;
    cards.forEach((card, currentOriginalIndex) => {
      const splitCard = card.split(' | ');
      const winningNumbers = getSet(splitCard[0].substring(8));
      const myNumbers = getSet(splitCard[1]);
      totalPoints += calculatePoints(winningNumbers, myNumbers, currentOriginalIndex, cards);
    });
    return totalPoints;
  }

  console.log(`I won ${points} points!`);
  console.log(`I have ${totalCards} cards!`); // Doesn't work for actual input :(
})();

// part 2
(() => {

})();