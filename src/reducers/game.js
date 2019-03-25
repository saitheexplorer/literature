import Constants from '../constants';

export function gameStarted(state = false, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return true;

    default:
      return state;
  }
}

export function score(state = { A: 0, B: 0 }, action) {
  const score = state[action.team];

  switch (action.type) {
    case Constants.UPDATE_SCORE:
      return {
        ...state,
        [action.team]: score + action.diff,
      };

    default:
      return state;
  }
}

export function gameEnded(state = false, action) {
  switch (action.type) {
    case Constants.END_GAME:
      return true;

    default:
      return state;
  }
}

export function numberOfTurns(state = 0, action) {
  switch (action.type) {
    case Constants.CHANGE_TURN:
      return state + 1;

    default:
      return state;
  }
}
