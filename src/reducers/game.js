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

function score(state = { A: 0, B: 0 }) {
  return state;
}

export default combineReducers({
  gameStarted,
  numberOfPlayers,
  score,
});
