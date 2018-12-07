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
    });
};

module.exports = Deck;
