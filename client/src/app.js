const Game = require('./models/game.js');
const CardsGridView = require('./views/cards_grid_view.js');
const WinnerView =require("./views/winner_view.js");
const HandCounterView = require("./views/hand_counter_view.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded")

  const game = new Game(2);
  game.bindEvents();
  game.startGame();

  const cardsGridView = new CardsGridView(document.querySelector('#card-grid-container'));
  cardsGridView.bindEvents();

  const winnerView = new WinnerView(document.querySelector("#winner-container"));
  winnerView.bindEvents();

  const player1HandCounterView = new HandCounterView(
    document.querySelector("#player1"),
    1
  );

  player1HandCounterView.bindEvents();

  const player2HandCounterView = new HandCounterView(
    document.querySelector("#player2"),
    2
  );

  player2HandCounterView.bindEvents();

});
