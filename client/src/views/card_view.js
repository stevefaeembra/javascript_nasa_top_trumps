const CardView = function (container) {
  this.container = container;
};

CardView.prototype.createCustomElement = function (elementType, label, textContent) {
  const customElement = document.createElement(elementType);
  customElement.textContent = `${label}: ${textContent}`;

  return customElement;
};

module.exports = CardView;
