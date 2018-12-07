const express = require('express');

const PlanetRouter = function (collection) {
  const router = express.Router();
  console.log("Making router", router);

  router.get('/', (req, res) => {
    console.log("In router /");
    res.json({'message': 'Hello World'});
  });
  return router;
}

module.exports = PlanetRouter;
