const PubSub = require('../helpers/pub_sub.js');

const CardView = function (container) {
  this.container = container;
};

CardView.prototype.renderCardDetails = function (card) {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';

  const image = this.createCustomElement('div', 'className', 'planet-image');
  const stats = this.createCustomElement('div', 'className', 'stats');

  // pick coloured card at random
  // colour defined matches colour temp of star
  // in Kelvin
  let frame = Math.floor(parseFloat(card.st_teff)/500.0);
  if (frame>20) {
    frame = 20;
  };
  let frameString=`000${frame}`.slice(-4);
  const url = `./images/${frameString}.png`;
  console.log(url);
  const imageDiv = this.createCustomElement('img', 'src', url);

  image.appendChild(imageDiv);

  console.log(card.st_teff);

  const playing_fields = {
    "Name": card.pl_name,
    "Distance": card.pl_orbsmax,
    "Orbit Period": card.pl_orbper,
    "Radius": card.pl_radj,
    "Mass": card.pl_bmassj,
    "Planets": card.pl_pnum,
    "Star Temp": card.st_teff
  };


  Object.keys(playing_fields).forEach((key) => {
    const statDiv = this.createCustomElement('div','className','stats-row');
    const labelDiv = this.createCustomElement('div','className','stats-row-label');
    labelDiv.textContent = key;
    if (labelDiv.textContent !== "Name" && labelDiv.textContent !== "Star Temp") {
    labelDiv.addEventListener('click', (event) => {
      PubSub.publish('CardView:category-clicked', event.target.textContent)
    })
  }
    const valueDiv = this.createCustomElement('div','className','stats-row-value');
    valueDiv.textContent = playing_fields[key];
    statDiv.appendChild(labelDiv);
    statDiv.appendChild(valueDiv);
    stats.appendChild(statDiv);
  })

  playerCard.appendChild(image);
  playerCard.appendChild(stats);

  return playerCard;
};

CardView.prototype.createCustomElement = function (type, attr, value) {
 const element = document.createElement(type);
 element[attr] = value;
 return element;
};

module.exports = CardView;
