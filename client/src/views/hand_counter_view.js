const PubSub = require('../helpers/pub_sub.js');

const HandCounterView = function (element, playerNumber) {
  this.element = element;
  this.playerNumber = playerNumber;
};

HandCounterView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:hands-after-match', (event) => {
    PubSub.signForDelivery(this,event);
    const handSizes = event.detail;
    this.render(handSizes[this.playerNumber - 1]);
  });
  PubSub.subscribe('Deck:hand-sizes', (event) => {
    PubSub.signForDelivery(this,event);
    const handSizes = event.detail;
    this.render(handSizes[this.playerNumber - 1]);
  });
};

HandCounterView.prototype.render = function (score) {
  this.element.innerHTML = '';
  const scoreView = document.createElement('div');
  scoreView.className = 'score';
  scoreView.textContent = `${score}`;
  this.element.appendChild(scoreView);
};

module.exports = HandCounterView;
