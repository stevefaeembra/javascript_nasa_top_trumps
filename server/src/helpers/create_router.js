const express = require('express');
const Croupier = require("./croupier");

const PlanetRouter = function (collection) {
  const router = express.Router();
  console.log("Making router");

  // mvp - pass back 1 card per player

  router.get('/', (req, res) => {
    croupier = new Croupier(collection);
    res.json(croupier.deal(2));
  });

  router.get('/deal/:number', (req, res) => {
    croupier = new Croupier(collection);
    var count_per_player = parseInt(req.params.number);
    res.json(croupier.deal(count_per_player));
  });

  return router;
}

module.exports = PlanetRouter;
