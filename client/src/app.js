const Game = require('./models/game.js');
const CardsGridView = require('./views/cards_grid_view.js');
const WinnerView =require("./views/winner_view.js");
const HandCounterView = require("./views/hand_counter_view.js");
const NextMatchButtonView = require("./views/next_match_button_view.js");
const StartGameButtonView = require("./views/start_game_button_view.js");
const RulesButtonView = require("./views/rules_button_view.js");
const RulesView = require("./views/rules_view.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded")

  const game = new Game();
  game.bindEvents();
  game.startGame();

  /* Card deck and scores */

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

  /* main button bar **/

  const nextMatchButtonView = new NextMatchButtonView(
    document.querySelector('#next-match')
  );
  nextMatchButtonView.bindEvents();

  const startGameButtonView = new StartGameButtonView(
    document.querySelector("#start-game")
  );
  startGameButtonView.bindEvents();

  /** Rules button and modal */

  const rulesButtonView = new RulesButtonView(
    document.querySelector('#rules-button')
  );
  rulesButtonView.bindEvents();

  const rulesView = new RulesView(
    document.querySelector('#rules-modal-container')
  );
  rulesView.bindEvents();

});
