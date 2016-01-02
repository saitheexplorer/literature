import Constants from 'constants';

export function startGame(numberOfPlayers) {
  return {
    type: Constants.START_GAME,
    numberOfPlayers
  };
}

export function updateScore(team, diff) {
  return {
    type: Constants.UPDATE_SCORE,
    team,
    diff
  }
}

export function changeTurn(player) {
  return {
    type: Constants.CHANGE_TURN,
    player
  };
}
