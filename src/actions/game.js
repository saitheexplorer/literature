import Constants from 'constants';

export function startGame(numberOfPlayers) {
  return {
    type: Constants.START_GAME,
    numberOfPlayers,
  };
}

export function changeCurrentPlayer(player) {
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
