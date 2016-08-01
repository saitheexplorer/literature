import Constants from 'constants';

export function startGame(numberOfPlayers) {
  return {
    type: Constants.START_GAME,
    numberOfPlayers,
  };
}
