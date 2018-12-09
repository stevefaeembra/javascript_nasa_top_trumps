const CardView = function (container) {
  this.container = container;
};

CardView.prototype.renderCardDetails = function (card) {
  const cardContainer = document.createElement('div');
  cardContainer.id = 'card';


};

CardView.prototype.createCustomElement = function (elementType, label, textContent) {
  const customElement = document.createElement(elementType);
  customElement.textContent = `${label}: ${textContent}`;

  return customElement;
};

module.exports = CardView;
