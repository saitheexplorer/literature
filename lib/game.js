var Immutable = require('immutable');

var Deck = require('./deck');
var deal = require('./deal');

module.exports = function (players) {
  var deck = Deck(players);

  var hands = deal(deck, {numberOfPlayers: players});

  var Game = {};

  for (var i = players; i > 0; i--) {
    Game[i] = {
      hand: hands.pop(),
      memory: {}
    }
  };

  return Immutable.fromJS(Game);
};
