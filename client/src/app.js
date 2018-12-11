const Game = require('./models/game.js');
const CardsGridView = require('./views/cards_grid_view.js');
const WinnerView =require("./views/winner_view.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded")

  const game = new Game();
  game.bindEvents();
  game.startGame();

  const cardsGridView = new CardsGridView(document.querySelector('#card-grid-container'));
  cardsGridView.bindEvents();

  const winnerView = new WinnerView(document.querySelector("#winner-container"));
  winnerView.bindEvents();

});
