import Constants from '../constants';

export function numberOfPlayers(state = 0, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return action.numberOfPlayers;

    default:
      return state;
  }
}

export function currentPlayer(state = '1', action) {
  switch (action.type) {
    case Constants.CHANGE_TURN:
      return action.player;

    default:
      return state;
  }
}
