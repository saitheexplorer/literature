var PLAYERS = 6;
var CURRENT_TURN = 1;

var deck = require('./lib/deck')(PLAYERS);
var deal = require('./lib/deal');

var hands = deal(deck, {numberOfPlayers: PLAYERS});

var Game = {};

for (var i = PLAYERS; i > 0; i--) {
  Game[i] = {
    hand: hands.pop(),
    memory: {}
  }
};

console.log(Game);

function play() {
  if (CURRENT_TURN === 1) return humanTurn();
  computerTurn(CURRENT_TURN);
}

function computerTurn(turn) {
  // determine which player to ask (check own cards and memory)

  // print question
  // ask

  // if receive card return changeTurn(turn)

  // else return changeTurn(askedPlayer)
}

function humanTurn() {
  // which player to ask?

  // which card to ask?

  // check

  // if receive card return changeTurn(1)

  // else return changeTurn(askedPlayer)
}

function answerQuestion(card, askingPlayer, askedPlayer) {
  // check if card

  // add to memory

  // log response

  // adjust hands
}

function changeTurn(player) {
  if (!_.isNumber || player > PLAYERS || players < 1) throw new Error('Provide a valid player number to change turns.');

  CURRENT_TURN = player;

  console.log('It is now Player ' + player + '\'s turn.');
  play();
}

