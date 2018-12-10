const PubSub = require('../helpers/pub_sub.js');

const WinnerView = function (container) {
  this.container = container;
};

WinnerView.prototype.render = function (winner) {
  this.container.innerHTML = '';
  const messageDiv = document.createElement("div");
  messageDiv.className = 'message';
  switch (winner) {
    case 0:
      messageDiv.textContent("Draw!");
      break;
    case 1:
      messageDiv.textContent("Player 1 Wins!");
      break;
    case 2:
      messageDiv.textContent("Player 2 wins!");
      break;
  }
  this.container.appendChild(messageDiv);
};

WinnerView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:winner-determined", (event) => {
    const winner = parseInt(event.detail);
    this.render(winner);
  })
};

module.exports = WinnerView;
