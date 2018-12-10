const CardView = function (container) {
  this.container = container;
};

CardView.prototype.renderCardDetails = function (card) {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';

  const image = this.createCustomElement('div', 'className', 'planet-image');
  const stats = this.createCustomElement('div', 'className', 'stats');

  const imageDiv = this.createCustomElement('img', 'src', './images/earth.jpg');

  image.appendChild(imageDiv);

  const playing_fields = {
    "Name": card.pl_name,
    "Distance to Sun (AU)": card.pl_orbsmax,
    "Orbital Period (Days)": card.pl_orbper,
    "Radius (x Jupiter)": card.pl_radj,
    "Mass (x Jupiter)": card.pl_bmassj,
    "Number in System": card.pl_pnum,
    "Temperature (K)": card.pl_teff
  };


  Object.keys(playing_fields).forEach((key) => {
    const statDiv = this.createCustomElement('div','className','stats-row');
    const labelDiv = this.createCustomElement('div','className','stats-row-label');
    labelDiv.textContent = key;
    const valueDiv = this.createCustomElement('div','className','stats-row-value');
    valueDiv.textContent playing_fields[key];
    statDiv.appendChild(labelDiv);
    statDiv.appendChild(valueDiv);
    stats.appendChild(statDiv);
  })

  playerCard.appendChild(image);
  playerCard.appendChild(stats);

  return playerCard;
};
