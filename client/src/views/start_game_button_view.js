const PubSub = require('../helpers/pub_sub.js');

const StartGameButtonView = function (element) {
  this.element = element;
};

StartGameButtonView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    PubSub.publish("StartButton:start-game",{});
  });
};

module.exports = StartGameButtonView;
