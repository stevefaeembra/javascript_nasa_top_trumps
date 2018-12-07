const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Deck = function () {

}

Deck.prototype.splitDeck = function (deck) {

  const handSize = deck.length/2;

  const playerHand = deck.slice(0, handSize);
  const computerHand = deck.slice(handSize, deck.length + 1);

  return [playerHand, computerHand];

};

module.exports = Deck;
