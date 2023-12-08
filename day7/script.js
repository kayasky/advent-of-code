const fs = require('fs');
const input = fs.readFileSync('./day7/input.txt', 'utf8');

(() => {
  const hands = input.split('\n');

  const weights = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

  function calculateWeightOfHand(handAndBid) {
    const hand = handAndBid.split(' ')[0];
    if (isFiveOfAKind(hand)) {
      return 1000000;
    } else if (isFourOfAKind(hand)) {
      return 100000;
    } else if (isFullHouse(hand)) {
      return 10000;
    } else if (isThreeOfAKind(hand)) {
      return 1000;
    } else if (isTwoPairs(hand)) {
      return 100;
    } else if (isOnePair(hand)) {
      return 10;
    } else {
      return 1;
    }

  }

  hands.forEach(hand => console.log(calculateWeightOfHand(hand)));

  function isFiveOfAKind(hand) {
    const firstCard = hand[0];
    for (let i = 1; i < hand.length; i++) {
      if (hand[i] !== firstCard) {
        return false;
      }
    }
    return true;
  }

  function calculateCardStats(hand) {
    const cardStats = {};
    for (let i = 0; i < hand.length; i++) {
      if (cardStats[hand[i]]) {
        cardStats[hand[i]]++;
      } else {
        cardStats[hand[i]] = 1;
      }
    }
    return cardStats;
  }

  function isFourOfAKind(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).includes(4);
  }

  function isFullHouse(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).includes(3) && Object.values(cardStats).includes(2);
  }

  function isThreeOfAKind(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).includes(3);
  }

  function isTwoPairs(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).filter(x => x === 2).length === 2;
  }

  function isOnePair(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).includes(2);
  }

})();