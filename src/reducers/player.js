import { combineReducers } from 'redux';

import Constants from 'constants';

function currentPlayer(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function currentTeam(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function isAsking(state = false, action) {
  switch (action.type) {
    case Constants.START_ASKING:
      return true;

    case Constants.START_DECLARING_SET:
      return false;

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

    case Constants.START_ASKING:
      return false;

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
