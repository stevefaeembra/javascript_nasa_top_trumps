const PubSub = require('../helpers/pub_sub.js');

const MessageView = function (container) {
  this.container = container;
};

MessageView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:message", (event) => {
    const message = event.detail;
    this.container.innerHTML = message;
  });
};

module.exports = MessageView;
