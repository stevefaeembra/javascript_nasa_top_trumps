const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const Deck = require('./deck.js');


const Game = function (players) {
  this.currentPlayers = players;
  this.deck = new Deck();
};

Game.prototype.startGame = function () {
  this.deck.getDeal();
  const cardsInPlay = this.deck.popCardsForPlayers(this.deck.hands);
  //pass cardsInPlay into compareCards
};

module.exports = Game;
