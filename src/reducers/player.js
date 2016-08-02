import { combineReducers } from 'redux';

import Constants from 'constants';

function currentPlayer(state = null, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return '1';

    case Constants.CHANGE_PLAYER:
      return String(action.player);

    default:
      return state;
  }
}

function currentTeam(state = null, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return 'A';

    case Constants.CHANGE_PLAYER:
      return parseInt(action.player, 10) % 2 === 1 ? 'A' : 'B';

    default:
      return state;
  }
}

function isAsking(state = false, action) {
  switch (action.type) {
    case Constants.START_ASKING:
      return true;

    case Constants.CANCEL_ASK_OR_DECLARE:
      return false;

    default:
      return state;
  }
}

function isDeclaring(state = false, action) {
  switch (action.type) {
    case Constants.START_DECLARING_SET:
      return true;

    case Constants.CANCEL_ASK_OR_DECLARE:
      return false;

    default:
      return state;
  }
}

export default combineReducers({
  currentPlayer,
  currentTeam,
  isAsking,
  isDeclaring,
});
