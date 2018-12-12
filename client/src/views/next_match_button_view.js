const PubSub = require('../helpers/pub_sub.js');

const NextMatchButtonView = function (element) {
  this.element = element;
};

NextMatchButtonView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    PubSub.publish("NextMatchButton:start-next-match",{});
  });
};

module.exports = NextMatchButtonView;
