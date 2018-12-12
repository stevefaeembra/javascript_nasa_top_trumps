const PubSub = require('../helpers/pub_sub.js');

const ButtonBarView = function (element) {
  this.element = element;
};

ButtonBarView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    PubSub.publish("NextMatchButton:start-next-match",{});
  });
};

module.exports = ButtonBarView;
