const fs = require('fs');
const input = fs.readFileSync('./day7/input.txt', 'utf8');

(() => {
  const hands = input.split('\n');
  const weights = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  let totalWinnings = 0;

  function calculateWeightOfHand(handAndBid) {
    const hand = handAndBid.split(' ')[0];
    let weightBasedOnCardStats = 0;

    if (isFiveOfAKind(hand)) {
      weightBasedOnCardStats = 1000000;
    } else if (isFourOfAKind(hand)) {
      weightBasedOnCardStats = 100000;
    } else if (isFullHouse(hand)) {
      weightBasedOnCardStats = 10000;
    } else if (isThreeOfAKind(hand)) {
      weightBasedOnCardStats = 1000;
    } else if (isTwoPairs(hand)) {
      weightBasedOnCardStats = 100;
    } else if (isOnePair(hand)) {
      weightBasedOnCardStats = 10;
    } else {
      weightBasedOnCardStats = 1;
    }

    return weightBasedOnCardStats;
  }

  hands.sort((hand1, hand2) => calculateWeightOfHand(hand1) > calculateWeightOfHand(hand2))
    .forEach((hand, index) => {
      const bid = hand.split(' ')[1];
      totalWinnings += bid * (index + 1);
      console.log(`Hand ${index + 1} won ${bid} with ${hand.split(' ')[0]}`);
    });


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

  function isFiveOfAKind(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).includes(3) && Object.values(cardStats).includes(5);
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

  console.log(totalWinnings);

})();