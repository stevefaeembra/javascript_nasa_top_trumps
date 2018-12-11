const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Deck = function () {
  this.deck = null;
  this.hands = null;
  this.discarded = [];
  this.cardsSentToGame = null;
}

Deck.prototype.getDeal = function () {
  const request = new RequestHelper('http://localhost:3000/api/exoplanets');
  request.get()
  .then((nPlanetData) =>{
    this.deck = nPlanetData;
    this.hands = this.splitDeck(this.deck);
    PubSub.publish('Deck:deck-loaded', '');
  })
};

Deck.prototype.splitDeck = function (deck) {
  const handSize = deck.length/2;
  const playerHand = deck.slice(0, handSize);
  const computerHand = deck.slice(handSize, deck.length + 1);
  return [playerHand, computerHand];
};

Deck.prototype.popCardsForPlayers = function () {
  const poppedCards = [];
  this.hands.forEach(hand => poppedCards.push(hand.pop()));
  if (typeof CustomEvent === 'undefined') {
    return poppedCards;
  }
  else {
    PubSub.publish('Deck:drawn-cards', poppedCards);
    this.cardsSentToGame = poppedCards;
    console.log('CARS SENT TO GAME', this.cardsSentToGame);
    return poppedCards;
  }
};

Deck.prototype.getHandSizes = function (hands) {
  const countedHands = [];
  hands.forEach((hand) => {
    countedHands.push(hand.length)
  });
  PubSub.publish('Deck:hand-sizes', countedHands);
  return countedHands;
};

Deck.prototype.putCardsAtBackOfHands = function (winner) {
  if (winner === 1) {
    this.hands[0].push(this.cardsSentToGame[0]);
    this.hands[0].push(this.cardsSentToGame[1]);
  }
  else if (winner === 2) {
    this.hands[1].push(this.cardsSentToGame[0]);
    this.hands[1].push(this.cardsSentToGame[1]);
  }
  // else if (winner === 0) {
  //   this.discarded.push(this.cardsSentToGame[0]);
  //   this.discarded.push(this.cardsSentToGame[1]);
  // }
  console.log('DISCARDED', this.discarded);
};

module.exports = Deck;
