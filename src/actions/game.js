import Constants from 'constants';

export function startGame(numberOfPlayers) {
  return {
    type: Constants.START_GAME,
    numberOfPlayers,
  };
}

export function changeTurn(player) {
  return {
    type: Constants.CHANGE_PLAYER,
    player,
  };
}

export function updateScore(team, diff) {
  return {
    type: Constants.UPDATE_SCORE,
    team,
    diff,
  };
}

export function outOfCards(player) {
  return {
    type: Constants.OUT_OF_CARDS,
    player,
  };
}

export function endGame() {
  return {
    type: Constants.END_GAME,
  };
}
