const PubSub = require('../helpers/pub_sub.js');

const NextMatchButtonView = function (element) {
  this.element = element;
};

NextMatchButtonView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    PubSub.publish("NextMatchButton:start-next-match",{});
  });

  PubSub.subscribe('NextMatchButton:start-next-match', () => {
    this.element.hidden = true;
  })

  PubSub.subscribe('Game:reveal-both-cards', () => {
    this.element.hidden = false;
  })
};

module.exports = NextMatchButtonView;
