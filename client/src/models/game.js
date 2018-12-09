const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Game = function (players) {
  this.currentPlayers = players;
  this.deck = null;
}

module.exports = Game;
