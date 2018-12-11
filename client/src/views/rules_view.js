const PubSub = require('../helpers/pub_sub.js');

const RulesView = function (element){
  this.element = element
};

RulesView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    PubSub.publish("Rules:show-rules",{});
  });
};

module.exports = RulesView;
