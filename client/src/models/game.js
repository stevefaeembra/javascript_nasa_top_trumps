const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const Deck = require('./deck.js');


const Game = function () {
  this.currentPlayer = 1;
  this.deck = new Deck();
  this.cardsInPlay = null;
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('Deck:deck-loaded', () => {
    this.playMatch();
  });
  PubSub.subscribe('CardView:category-clicked', (event) => {
    if (this.currentPlayer === 1) {
      this.playerTurn(event.detail)
    }
  })
};

Game.prototype.startGame = function () {
  this.deck.getDeal();
};

Game.prototype.playMatch = function () {
  this.cardsInPlay = this.deck.popCardsForPlayers();
  PubSub.publish('Game:hands-after-match', [this.deck.hands[0].length, this.deck.hands[1].length]);
  if (this.currentPlayer === 2) {
    this.computerTurn();
  }
};

Game.prototype.playerTurn = function (label) {
    const category = this.keyFormatter(label);
    this.endMatch(category);
};

Game.prototype.keyFormatter = function (label) {
  const keys = {
    "Distance": "pl_orbsmax",
    "Orbit Period": "pl_orbper",
    "Radius": "pl_radj",
    "Mass": "pl_bmassj",
    "Planets": "pl_pnum",
  }
  return keys[label];
};

Game.prototype.computerTurn = function () {
  const categories = this.getCategories(this.cardsInPlay[0]);
  const randomCategory = this.randomCategory(categories);
  this.endMatch(randomCategory);
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

Game.prototype.endMatch = function (category) {
  const winner = this.compareCards(category);
  this.deck.putCardsAtBackOfHands(winner);
  PubSub.publish('Game:hands-after-match', [this.deck.hands[0].length, this.deck.hands[1].length]);
  PubSub.publish('Game:winner-determined', winner);
  this.checkWinner();
  //debugger;
  this.switchTurns();
  this.playMatch();
};

Game.prototype.compareCards = function (category) {
  console.log(category);
  const winnerCard = []
  for (card of this.cardsInPlay) {
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
  return this.cardsInPlay.indexOf(winnerCard[0])+1;
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
};

Game.prototype.switchTurns = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 2;
  }
  else if (this.currentPlayer === 2) {
    this.currentPlayer = 1;
  }
  PubSub.publish('Game:current-player', this.currentPlayer);
  console.log('switch turns function', this.currentPlayer);
};

module.exports = Game;
