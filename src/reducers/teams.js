import { Map, Range } from 'immutable';

import Constants from '../constants';

export function currentTeam(state = 'A', action) {
  switch (action.type) {
    case Constants.CHANGE_TURN:
      return parseInt(action.player, 10) % 2 === 1 ? 'A' : 'B';

    default:
      return state;
  }
}

export function teams(state = Map(), action) {
  switch (action.type) {
    case Constants.START_GAME:
      let teamA = Range(1, action.numberOfPlayers, 2)
        .toJS()
        .map(String);
      let teamB = Range(2, action.numberOfPlayers + 1, 2)
        .toJS()
        .map(String);

      return state.set('A', teamA).set('B', teamB);

    case Constants.OUT_OF_CARDS:
      let team = parseInt(action.player, 10) % 2 === 1 ? 'A' : 'B';

      return state.set(
        team,
        state.get(team).filter(player => player !== action.player)
      );

    default:
      return state;
  }
}
