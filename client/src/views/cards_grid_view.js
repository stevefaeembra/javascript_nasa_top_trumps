const PubSub = require('../helpers/pub_sub.js');
const CardView = require('./card_view.js');

const CardGridView = function (container){
  this.container = container;
  this.currentMatchCards = [];
};

CardGridView.prototype.bindEvents = function () {
  PubSub.subscribe('Deck:drawn-cards', (event) => {
    this.clearGrid();
    this.renderCards(event.detail,1);
    this.currentMatchCards = event.detail;
  });
  PubSub.subscribe('Game:current-player', (event) => {
    // we know who is next up. If it's player1,
    // hide player2 card, otherwise show both.
    PubSub.signForDelivery(this,event);
    const new_player = event.detail; // 1 or 2
    this.clearGrid();
    this.renderCards(this.currentMatchCards, new_player);
  });
};

CardGridView.prototype.clearGrid = function () {
  this.container.innerHTML = '';
};

CardGridView.prototype.renderCards = function (cards, currentPlayer) {
  cards.forEach((card, index, array) => {
    const cardItem = this.createCardItem(card);
    // if human turn and player index, hide card
    if (index != currentPlayer) {
      cardItem.classList.add("back");
    }
    this.container.appendChild(cardItem);
  });
};

CardGridView.prototype.createCardItem = function (card) {
  const cardView = new CardView();
  const cardItem = cardView.renderCardDetails(card);
  return cardItem;
};


module.exports = CardGridView;
