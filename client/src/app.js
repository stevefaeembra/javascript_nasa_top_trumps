const Game = require('./models/game.js');
const CardsGridView = require('./views/cards_grid_view.js');
const WinnerView =require("./views/winner_view.js");
const Deck = require("./models/deck.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded")

  const game = new Game(2);
  game.bindEvents();
  game.startGame();

  const deck = new Deck();
  deck.bindEvents();

  const cardsGridView = new CardsGridView(document.querySelector('#card-grid-container'));
  cardsGridView.bindEvents();

  const winnerView = new WinnerView(document.querySelector("#winner-container"));
  winnerView.bindEvents();

});
