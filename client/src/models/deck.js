const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Deck = function () {
  this.deck = null;
  this.hands = null;
  this.cardsSentToGame = null;
}

Deck.prototype.getDeal = function () {
  const request = new RequestHelper('http://localhost:3000/api/exoplanets');
  request.get()
  .then((nPlanetData) =>{
    this.deck = nPlanetData;
    this.hands = this.splitDeck(this.deck);
    console.log(this.hands);
    PubSub.publish('Deck:deck-changed', this.hands);
  })
};

Deck.prototype.splitDeck = function (deck) {
  const handSize = deck.length/2;
  const playerHand = deck.slice(0, handSize);
  const computerHand = deck.slice(handSize, deck.length + 1);
  return [playerHand, computerHand];
};

Deck.prototype.popCardsForPlayers = function (hands) {
  const poppedCards = [];
  console.log(hands);
  hands.forEach(hand => poppedCards.push(hand.pop()));
  if (typeof CustomEvent === 'undefined') {
    return poppedCards;
  }
  else {
    PubSub.publish('Deck:drawn-cards', poppedCards);
    this.hands = hands;
    this.cardsSentToGame = poppedCards;
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
    console.log('AHHHHHH', this.cardsSentToGame);
    this.hands[0].push(this.cardsSentToGame[0]);
    this.hands[0].push(this.cardsSentToGame[1]);
  }
  else if (winner === 2) {
    this.hands[1].push(this.cardsSentToGame[0]);
    this.hands[1].push(this.cardsSentToGame[1]);
  }
  console.log('hand is one array', this.hands);
};

module.exports = Deck;
