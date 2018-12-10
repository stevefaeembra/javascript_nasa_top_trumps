const CardView = function (container) {
  this.container = container;
};

CardView.prototype.renderCardDetails = function (card) {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';

  const image = this.createCustomElement('div', 'className', 'planet-image');
  const stats = this.createCustomElement('div', 'className', 'stats');

  playerCard.appendChild(image);
  playerCard.appendChild(stats);



  return playerCard;
};


CardView.prototype.createCustomElement = function (type, attr, value) {
 const element = document.createElement(type);
 element[attr] = value;
 return element;
};

module.exports = CardView;
