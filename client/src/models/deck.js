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

Deck.prototype.bindEvents = function () {
  PubSub.subscribe('Game:winner-determined', (event) => {
    const winner = event.detail;
    this.putCardsAtBackOfHands(winner);
  });

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
    console.log(this.hands);

    this.hands[0].push(this.cardsSentToGame);
  }
  else if (winner === 2) {
    this.hands[1].push(this.cardsSentToGame);
  }
};

module.exports = Deck;
