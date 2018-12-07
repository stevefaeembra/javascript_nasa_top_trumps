const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PlanetRouter = require('./helpers/create_router.js');
const data = require('./db/planets.js');

const publicPath = path.join(__dirname, '../client/public');

app.use(express.static(publicPath));
app.use(bodyParser.json());

const planetRouter = new PlanetRouter(data);
app.use('/exoplanets', planetRouter);

app.listen(3000, function () {
  console.log('Started server');
});

const deal = function(number_per_player) {
  // return an array of 2*number_per_player exoplanets
  // shuffle uses a random comparator which returns [-0.5,0.5]
  // this should shuffle things at random
  const shuffleArray = (data) => arr.sort((planet) => Math.random() - .5);
  return shuffleArray.slice(0,2*number_per_player);
};
