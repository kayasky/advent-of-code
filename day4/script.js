import { readFileSync } from 'fs';
const input = readFileSync('./day4/input.txt', 'utf8');

// parts 1 & 2
(() => {
  const pileOfScratchCards = input.split('\n');
  let wonCards = [];
  let points = 0;
  let totalCards = 0;

  // Uses recursion to calculate the points for each card. Very inefficient. Very tricky.
  const calculatePoints = (winningNumbers, myNumbers, cardNumber) => {
    const myWinningNumbers = [...winningNumbers.intersection(myNumbers)];
    let pointsForThisCard = 0;
    totalCards += 1;

    if (myWinningNumbers.length) {
      pointsForThisCard = Math.pow(2, myWinningNumbers.length - 1);
      const indexOfThisCard = pileOfScratchCards.findIndex((card) => card.startsWith(cardNumber));
      wonCards = pileOfScratchCards.slice(indexOfThisCard + 1, indexOfThisCard + myWinningNumbers.length + 1);
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
    cards.forEach((card) => {
      const splitCard = card.split(' | ');
      const winningNumbers = getSet(splitCard[0].substring(8));
      const cardNumber = splitCard[0].substring(0, splitCard[0].indexOf(':'));
      const myNumbers = getSet(splitCard[1]);
      totalPoints += calculatePoints(winningNumbers, myNumbers, cardNumber);
    });
    return totalPoints;
  }

  console.log(`I won ${points} points!`);
  console.log(`I have ${totalCards} cards!`);
})();
