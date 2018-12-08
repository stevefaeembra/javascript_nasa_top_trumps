const express = require('express');

const PlanetRouter = function (collection) {
  const router = express.Router();
  console.log("Making router");

  router.get('/', (req, res) => {
    res.json({'hand': this.deal(collection, 1)});
  });

  return router;
}

PlanetRouter.prototype.deal = function (data, number_per_player) {
  // return an array of 2*number_per_player exoplanets
  // shuffle uses a random comparator which returns [-0.5,0.5]
  // this should shuffle things at random
  //(data) => data.sort((planet) => Math.random() - .5);

  return data.slice(0, 2*number_per_player);
};

module.exports = PlanetRouter;
