const express = require('express');
const Croupier = require("./croupier");

const PlanetRouter = function (collection) {
  const router = express.Router();
  console.log("Making router");

  router.get('/', (req, res) => {
    croupier = new Croupier(collection);
    res.json(croupier.deal(1));
  });

  return router;
}

module.exports = PlanetRouter;
