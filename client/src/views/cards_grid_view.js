const PubSub = require('../helpers/pub_sub.js');
const CardView = require('./card_view.js');

const CardGridView = function (container){
  this.container = container;
};

CardGridView.prototype.bindEvents = function () {
  PubSub.subcribe('Deck:drawn-cards', (event) => {

  })
};

module.exports = CardGridView;
