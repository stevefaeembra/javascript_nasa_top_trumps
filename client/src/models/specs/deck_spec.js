const assert = require('assert');
const Deck = require('../deck.js');

describe('Deck', function () {
  let deck;
  let cardDeck;

  beforeEach(function () {
    deck = new Deck();
    cardDeck = [1,2,3,4,5,6,7,8,9,10];
  });

  it('should split a deck', function () {
    const expected = [[1,2,3,4,5],[6,7,8,9,10]];
    assert.deepStrictEqual(deck.splitDeck(cardDeck), expected );
  });

  it('should pop a card from each deck', function () {
    const expected = [5,10];
    assert.deepStrictEqual(deck.popCardsForPlayers(deck.splitDeck(cardDeck)), expected);
  });

});
