import { Map, Range } from 'immutable';

import Constants from 'constants';

export function gameStarted(state = false, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return true;

    default:
      return state;
  }
}

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

export function currentTeam(state = 'A', action) {
  switch (action.type) {
    case Constants.CHANGE_TURN:
      return (parseInt(action.player, 10) % 2 === 1) ? 'A' : 'B';

    default:
      return state;
  }
}

export function teams(state = Map(), action) {
  switch (action.type) {
    case Constants.START_GAME:
      let teamA = Range(1, action.numberOfPlayers, 2).toJS().map(String);
      let teamB = Range(2, action.numberOfPlayers + 1, 2).toJS().map(String);

      return state.set('A', teamA).set('B', teamB);

    default:
      return state;
  }
}

export function score(state = Map({A: 0, B: 0}), action) {
  let score = state.get(action.team, 0);

  switch (action.type) {
    case Constants.UPDATE_SCORE:
      return state.set(action.team, score + action.diff);

    default:
      return state;
  }
}
