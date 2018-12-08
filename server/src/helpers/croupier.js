const data = require("../../db/planets.js");

const Croupier = function (cards) {
  this.deck = this.discardRubbishCards(cards);
}

Croupier.prototype.cardIsGood = function (planet) {
  return planet.pl_radj !== null &&  // radius as multiple of Jupiter
  planet.pl_bmassj !== null &&       // best-guess mass relative to jupiter
  planet.pl_orbsmax !== null &&      // max distance from star in AU
  planet.pl_orbper !== null;         // orbital period, days
};

Croupier.prototype.discardRubbishCards = function (cards) {
  // gets rid of cards where some of the fields are missing
  // about 10% of cards are suitable
  return cards.filter( (card) => {
    return this.cardIsGood(card);
  });
};

Croupier.prototype.deal = function(number_per_player=1) {
  // given deck and number of cards per player,
  // return flat array of 2*number_per_player cards

  let validCards = this.deck;
  let result = validCards.slice(0, number_per_player * 2);
  return result;
};

module.exports = Croupier;
