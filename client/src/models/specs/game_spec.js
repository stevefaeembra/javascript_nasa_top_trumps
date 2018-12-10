const assert = require('assert');
const Game = require('../game.js');

describe('Deck', function () {
  let game;
  let testHands;

  beforeEach(function () {
    game = new Game();
    testObject = {name: "square", height: 2, width: 4};
    testObjects = [
      {name: "square", height: 2, width: 4, age: 2},
      {name: "circle", height: 10, width: 1, age: 2}
    ];
  });

  it('should return the keys from the first object in the array, minus the first key', function () {
    const expected = ["height", "width"];
    assert.deepStrictEqual(game.getCategories(testObject), expected );
  });

  it('should return an integer based on the highest value of a key of two objects', function () {
    const expected = 2;
    assert.deepStrictEqual(game.compareCards(testObjects, 'height'), expected);
  });

  it('should return an integer based on the highest value of a key of two objects', function () {
    const expected = 1;
    assert.deepStrictEqual(game.compareCards(testObjects, 'width'), expected);
  });

  it('should return an integer based on the highest value of a key of two objects', function () {
    const expected = 0;
    assert.deepStrictEqual(game.compareCards(testObjects, 'age'), expected);
  });

});
