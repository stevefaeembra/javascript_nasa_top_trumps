const PubSub = require('../helpers/pub_sub.js');

const RulesView = function (element){
  this.element = element
};


RulesView.prototype.renderRules = function () {
  PubSub.subscribe("Rules:show-rules", (event) => {
    this.renderModal();
  });
}

RulesView.prototype.renderModal = function () {
  const rulesContent = document.createElement('div');
  rulesContent.className = 'rules-content';

  const rulesBody = document.createElement('div');
  rulesBody.className = 'rulesBody';
  rulesBody.textContent = 'Please see this message!!';

  rulesContent.appendChild(rulesBody)
  this.element.appendChild(rulesContent);
};


module.exports = RulesView;
