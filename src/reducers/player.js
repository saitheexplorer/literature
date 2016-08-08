import { combineReducers } from 'redux';

import Constants from 'constants';

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
  isAsking,
  isDeclaring,
});
