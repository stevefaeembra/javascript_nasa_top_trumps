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
  PubSub.publish('Game:hands-after-match', [this.deck.hands[0].length, this.deck.hands[1].length]);
  if (this.currentPlayer === 1) {
    this.playerTurn(cardsInPlay);
  }
  else if (this.currentPlayer === 2) {
    this.computerTurn(cardsInPlay);
  }
};

Game.prototype.playerTurn = function (cardsInPlay) {
  PubSub.subscribe('CardView:category-clicked', (event) => {
    const category = this.keyFormatter(event.detail);
    this.endMatch(cardsInPlay, category);
  })
};

Game.prototype.computerTurn = function (cardsInPlay) {
  const categories = this.getCategories(cardsInPlay[0]);
  const randomCategory = this.randomCategory(categories);
  this.endMatch(cardsInPlay, randomCategory);
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

Game.prototype.endMatch = function (cardsInPlay, category) {
  debugger;
  const winner = this.compareCards(cardsInPlay, category);
  this.deck.putCardsAtBackOfHands(winner);
  PubSub.publish('Game:hands-after-match', [this.deck.hands[0].length, this.deck.hands[1].length]);
  PubSub.publish('Game:winner-determined', winner);
  this.checkWinner();
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
  this.playMatch();
};

Game.prototype.switchTurns = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 2;
  }
  else if (this.currentPlayer === 2) {
    this.currentPlayer = 1;
  }
  console.log('switch turns function', this.currentPlayer);
};

module.exports = Game;
