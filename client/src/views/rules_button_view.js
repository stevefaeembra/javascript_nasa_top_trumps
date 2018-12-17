const PubSub = require('../helpers/pub_sub.js');

const RulesButtonView = function (element){
  this.element = element
};

RulesButtonView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    PubSub.publish("Rules:show-rules",{});
  });
};

module.exports = RulesButtonView;
