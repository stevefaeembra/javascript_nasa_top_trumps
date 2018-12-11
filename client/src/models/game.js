const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const Deck = require('./deck.js');


const Game = function () {
  this.currentPlayer = 1;
  this.deck = new Deck();
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('Deck:deck-loaded', () => {
    this.playMatch();
  });
};

Game.prototype.startGame = function () {
  this.deck.getDeal();
  this.startMatch();
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


Game.prototype.playMatch = function () {
  const cardsInPlay = this.deck.popCardsForPlayers();
  if (this.currentPlayer === 1) {}
  const categories = this.getCategories(cardsInPlay[0]);
  const randomCategory = this.randomCategory(categories);
  const winner = this.compareCards(cardsInPlay, randomCategory);
  this.deck.putCardsAtBackOfHands(winner);
  PubSub.publish('Game:hands-after-match', [this.deck.hands[0].length, this.deck.hands[1].length]);
  PubSub.publish('Game:winner-determined', winner);
  setTimeout(this.checkWinner(),2000);
};

Game.prototype.checkWinner = function () {
  if (this.deck.hands[0].length === 0 && this.deck.hands[1].length !== 0) {
    PubSub.publish('Game:game-winner-determined', 'Computer wins!');
  }
  else if (this.deck.hands[1].length === 0 && this.deck.hands[0].length !== 0) {
    PubSub.publish('Game:game-winner-determined', 'Player wins!');
  }
  else if (this.deck.hands[1].length === 0 && this.deck.hands[0].length === 0) {
    PubSub.publish('Game:game-winner-determined', 'Draw! What are the chances?! (astronomical!)');
  }
  this.switchTurns();
};

Game.prototype.startMatch = function () {
  PubSub.subscribe("NextMatchButton:start-next-match", () => {
    this.playMatch();
  });
};

Game.prototype.switchTurns = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 2;
  }
  else if (this.currentPlayer === 2) {
    this.currentPlayer = 1;
  }
};

module.exports = Game;
