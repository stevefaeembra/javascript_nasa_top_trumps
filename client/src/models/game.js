const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const Deck = require('./deck.js');


const Game = function (players) {
  this.currentPlayers = players;
  this.deck = new Deck();
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('Deck:deck-changed', (event) => {
    const myhands = event.detail;
    const cardsInPlay = this.deck.popCardsForPlayers(myhands);
    const categories = this.getCategories(cardsInPlay[0]);
    const randomCategory = this.randomCategory(categories);
    const winner = this.compareCards(cardsInPlay, randomCategory);
    this.deck.putCardsAtBackOfHands(winner);
    PubSub.publish('Game:winner-determined', winner);
  });
};

Game.prototype.startGame = function () {
  this.deck.getDeal();
};

Game.prototype.getCategories = function (object) {
  const categories = Object.keys(object);
  return categories.slice(1,categories.length);
}; //pass in this.hands[0][0]

Game.prototype.randomCategory = function (categories) {
  const randomNumber = this.getRandomNumber(categories.length);
  return categories[randomNumber];
};

Game.prototype.getRandomNumber = function (maximum) {
  return Math.floor(Math.random() * Math.floor(maximum));
};

Game.prototype.compareCards = function (cards, category) {
  console.log(category);
  const winnerCard = []
  for (card of cards) {
    if (winnerCard.length === 0) {
      winnerCard.push(card);
    }
    else if (card[category] > winnerCard[0][category]) {
      winnerCard.pop();
      winnerCard.push(card);
    }
    else if (card[category] === winnerCard[0][category]) {
      return 0;
    }
  };
  return cards.indexOf(winnerCard[0])+1;
};


module.exports = Game;
