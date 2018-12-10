const PubSub = require('../helpers/pub_sub.js');
const CardView = require('./card_view.js');

const CardGridView = function (container){
  this.container = container;
};

CardGridView.prototype.bindEvents = function () {
  PubSub.subcribe('Deck:drawn-cards', (event) => {
    this.clearGrid();
    this.renderCardDetails(event.detail)
  });
};

CardGridView.prototype.clearGrid = function () {
  this.container.innerHTML = '';
};

CardGridView.prototype.renderCardDetails = function (cards) {
  cards.forEach((card) => {
    const cardItem = this.createCardItem(card);
    this.container.appendChild(cardItem);
  });
};

module.exports = CardGridView;
