var _ = require('lodash');

function dealDeck(deck, options) {
  options = _.defaults(options, {numberOfCards: 52, numberOfPlayers: 1});

  var hands = {};

  for (var j = options.numberOfCards - 1; j >= 0; j--) {
    for (var i = options.numberOfPlayers; i > 0; i--) {
      hands[i] = hands[i] || [];
      hands[i].push(deck.pop());
    };
  };

  return _.chain(hands).values().map(_.compact).map(function (val) {
    return _.sortByAll(val, ['suit', 'rank']);
  }).shuffle().value();
}

module.exports = dealDeck;
