const data = require("../../db/planets.js");

const Croupier = function (cards) {
  this.deck = cards;
}


Croupier.prototype.deal = function(number_per_player=1) {
  // given deck and number of cards per player,
  // return flat array of 2*number_per_player cards

  let validCards = this.deck;
  let result = validCards.slice(0, number_per_player * 2);
  return result;
};

module.exports = Croupier;
