import { combineReducers } from 'redux';

import deck from 'reducers/deck';
import game from 'reducers/game';
import player from 'reducers/player';

export default combineReducers({
  deck,
  game,
  player,
});
