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

  it('should never send back duplicates', function () {
    for(var i=0;i<1000;i++) {
      // deal two cards, ensure no dupes
      var mvp_hand = croupier.deal(22);
      var allUnique = mvp_hand.every((card, index, array) => {
        // this should fail if a card appears twice...
        return mvp_hand.indexOf(card) === array.indexOf(card);
      })
      assert.strictEqual(allUnique, true);
    }
  });

});
