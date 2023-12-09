const fs = require('fs');
const input = fs.readFileSync('./day7/input.txt', 'utf8');

(() => {
  const hands = input.split('\n');
  const weights = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

  console.log(calculateWinnings());

  function calculateWinnings() {
    let totalWinnings = 0;

    hands.sort((hand1, hand2) => compareHands(hand1, hand2))
      .forEach((hand, index) => {
        const bid = getBid(hand);
        totalWinnings += bid * (index + 1);
      });

    return `My total winnings are ${totalWinnings}!!!`;
  }

  function compareHands(handAndBid1, handAndBid2) {
    const weightOfHand1 = calculateWeightOfHand(handAndBid1);
    const weightOfHand2 = calculateWeightOfHand(handAndBid2);

    if (weightOfHand1 === weightOfHand2) {
      return compareIndividualCards(handAndBid1, handAndBid2);
    }

    return weightOfHand1 > weightOfHand2;
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

  function isFiveOfAKind(hand) {
    const cardStats = calculateCardStats(hand);
    return Object.values(cardStats).includes(5);
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


  function getBid(handAndBid) {
    return handAndBid.split(' ')[1];
  }

  function getHand(handAndBid) {
    return handAndBid.split(' ')[0];
  }

  function calculateWeightOfHand(handAndBid) {
    const hand = getHand(handAndBid);
    let weightBasedOnCardStats = 0;

    if (isFiveOfAKind(hand)) {
      weightBasedOnCardStats = 7;
    } else if (isFourOfAKind(hand)) {
      weightBasedOnCardStats = 6;
    } else if (isFullHouse(hand)) {
      weightBasedOnCardStats = 5;
    } else if (isThreeOfAKind(hand)) {
      weightBasedOnCardStats = 4;
    } else if (isTwoPairs(hand)) {
      weightBasedOnCardStats = 3;
    } else if (isOnePair(hand)) {
      weightBasedOnCardStats = 2;
    } else {
      weightBasedOnCardStats = 1;
    }

    return weightBasedOnCardStats;
  }

  function compareIndividualCards(handAndBid1, handAndBid2) {
    const hand1 = getHand(handAndBid1);
    const hand2 = getHand(handAndBid2);

    for (let i = 0; i < hand1.length; i++) {
      if (weights.indexOf(hand1[i]) > weights.indexOf(hand2[i])) {
        return true;
      } else if (weights.indexOf(hand1[i]) < weights.indexOf(hand2[i])) {
        return false;
      }
    }
  }

})();