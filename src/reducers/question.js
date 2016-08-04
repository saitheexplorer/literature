import { combineReducers } from 'redux';

import Constants from 'constants';

function askedPlayer(state = null, action) {
  switch (action.type) {
    case Constants.CHANGE_ASKED_PLAYER:
      return action.askedPlayer;

    default:
      return state;
  }
}

function askedCard(state = null, action) {
  switch (action.type) {
    case Constants.CHANGE_ASKED_CARD:
      return action.askedCard;

    default:
      return state;
  }
}

export default combineReducers({
  askedPlayer,
  askedCard,
});
