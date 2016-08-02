import Constants from 'constants';

export function startGame(numberOfPlayers) {
  return {
    type: Constants.START_GAME,
    numberOfPlayers,
  };
}

export function changePlayer(player) {
  return {
    type: Constants.CHANGE_PLAYER,
    player,
  };
}
