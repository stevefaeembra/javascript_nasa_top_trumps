const CardView = function (container) {
  this.container = container;
};

CardView.prototype.renderCardDetails = function (card) {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';

  const image = this.createCustomElement('div', 'className', 'planet-image');
  const stats = this.createCustomElement('div', 'className', 'stats');

  const imageDiv = this.createCustomElement('img', 'src', './images/earth.jpg');

  image.appendChild(imageDiv);

  const statsDiv = this.createCustomElement('div', 'className', 'stats-row');
  //<img src="./images/earth.jpg" alt="earth" height='300px' width='300px'>

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
