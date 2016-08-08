import Immutable from 'seamless-immutable';
import { combineReducers } from 'redux';

import Constants from 'constants';

function gameStarted(state = false, action) {
  if (action.type !== Constants.START_GAME) return state;

  return true;
}

function numberOfPlayers(state = false, action) {
  if (action.type !== Constants.START_GAME) return state;

  return action.numberOfPlayers;
}

function score(state = Immutable.from({ A: 0, B: 0 }), action) {
  switch (action.type) {
    case Constants.UPDATE_SCORE:
      return state.merge({ [action.team]: state[action.team] + action.diff });

    default:
      return state;
  }
}

function currentPlayer(state = '0', action) {
  switch (action.type) {
    case Constants.START_GAME:
      return '1';

    case Constants.CHANGE_PLAYER:
      return String(action.player);

    default:
      return state;
  }
}

function currentTeam(state = '0', action) {
  switch (action.type) {
    case Constants.START_GAME:
      return 'A';

    case Constants.CHANGE_PLAYER:
      return parseInt(action.player, 10) % 2 === 1 ? 'A' : 'B';

    default:
      return state;
  }
}

export default combineReducers({
  gameStarted,
  numberOfPlayers,
  score,
  currentPlayer,
  currentTeam,
});
