const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Deck = function () {
  this.deck = null;
  this.hands = null;
}

Deck.prototype.getDeal = function () {
  const request = new RequestHelper('???');
  request.get()
  then((nPlanetData) =>{
    this.deck = nPlanetData;
    this.hands = splitDeck(this.deck);
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
  playerCard = hands[0].pop();
  computerCard = hands[1].pop();
  return [playerCard, computerCard]
};

module.exports = Deck;
