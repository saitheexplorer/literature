import Constants from '../constants';

import { updateScore } from '../actions/game';
import sendMessage from '../actions/messages';
import manageTurn, { passTurnToNextOpponent } from '../actions/turn';

export default function tryToDeclareSet(set, calls) {
  return (dispatch, getState) => {
    const state = getState();
    const cardsInPlay = state.cardsInPlay;

    const checkedCalls = calls.map(call => {
      const actualOwner = cardsInPlay
        .find(card => card.get('id') === call.get('id'))
        .get('owner');

      return call.set('actualOwner', actualOwner);
    });

    const badCalls = checkedCalls.filter(
      call => call.get('owner') !== call.get('actualOwner')
    );

    if (badCalls.size) dispatch(bungleSet(set, badCalls.toJS()));
    else dispatch(declareSet(set));

    dispatch(removeSet(set));
    dispatch(manageTurn());
  };
}

function bungleSet(set, badCalls) {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(sendMessage(`${set} was bungled. ${JSON.stringify(badCalls)}`));
    dispatch(updateScore(state.currentTeam, -0.5));
    dispatch(passTurnToNextOpponent());
  };
}

function declareSet(set) {
  return (dispatch, getState) => {
    dispatch(sendMessage(`${set} was correctly called.`));
    dispatch(updateScore(getState().currentTeam, 1));
  };
}

function removeSet(set) {
  return {
    type: Constants.REMOVE_SET,
    set,
  };
}
