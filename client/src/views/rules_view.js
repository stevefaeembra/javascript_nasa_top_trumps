const PubSub = require('../helpers/pub_sub.js');

const RulesView = function (element){
  this.element = element;
};


RulesView.prototype.bindEvents = function () {
  PubSub.subscribe("Rules:show-rules", (event) => {
    this.renderModal();
  });
}

RulesView.prototype.renderModal = function () {
  this.element.innerHTML = '';
  this.element.style.visibility = 'visible';

  const rulesContent = document.createElement('div');
  rulesContent.className = 'rules-modal';
  rulesContent.style.display = 'visible';

  const rulesText = document.createElement('div');
  rulesText.className = 'rules-text';
  rulesText.textContent = 'Please see this message!!';

  rulesContent.appendChild(rulesText);
  this.element.appendChild(rulesContent);
};


module.exports = RulesView;
