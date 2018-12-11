const PubSub = require('../helpers/pub_sub.js');

const RulesView = function (element){
  this.element = element
};


RulesView.prototype.bindEvents = function () {
  PubSub.subscribe("Rules:show-rules", (event) => {
    this.renderModal();
  });

  this.element.addEventListener("click", (event) => {
    this.element.style.visibility = 'hidden';
  })

}

RulesView.prototype.renderModal = function () {
  this.element.innerHTML = '';
  this.element.style.visibility = 'visible';

  const rulesContent = document.createElement('div');
  rulesContent.className = 'rules-content';

  const rules = [
    "Rules",
    "The objective of the game is to win all of your opponent’s cards, leaving them with a hand of 0.",
    "Each match begins by each player taking the top card from their hand. The current player then chooses a category on their card.",
    "If the selected category has a higher number than the opponent’s card’s equivalent category then the current player wins the match and adds both played cards to the back of their hand.",
    "If the selected category value is the same for both players it is a DRAW! In this case both players discard their match card and move onto the next match.",
    "The next match then starts, this time with the opponent getting to choose the category. This cycle continues until one player has all of the playable cards."
  ];

  const rulesBody = document.createElement('div');
  rulesBody.className = 'rulesBody';
  rules.forEach((line) => {
    const newLine = document.createElement('p');
    newLine.className = 'newLine';
    newLine.textContent = line;
    rulesBody.appendChild(newLine);
  })

  rulesContent.appendChild(rulesBody)
  this.element.appendChild(rulesContent);
};


module.exports = RulesView;
