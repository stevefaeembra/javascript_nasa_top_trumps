const assert = require('assert');
const Croupier = require('../croupier.js');
const data = require("../../../db/planets.js");

describe('Croupier', function () {

  let croupier;

  beforeEach(function () {
    croupier = new Croupier(data);
  });

  it('should give two cards by default', function () {
    let result = croupier.deal();
    assert.strictEqual(result.length, 2 );
  });

  it('should give two 2Ncards where N is specified', function () {
    let result = croupier.deal(14);
    assert.strictEqual(result.length, 28);
  });

  it('should discard poor cards where data is missing', function () {
    let result = croupier.deal(14);
    let allGood = result.every((planet) => {
      return planet.pl_radj !== null &&
      planet.pl_bmassj !== null &&
      planet.pl_orbsmax !== null &&
      planet.pl_orbper !== null;
    });
    assert.strictEqual(allGood,true);
    assert.strictEqual(croupier.deck.length,444)
  });


});
