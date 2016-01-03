import Constants from 'constants';

import { updateScore } from 'actions/game';
import sendMessage from 'actions/messages';
import manageTurn, { passTurnToNextOpponent } from 'actions/turn';

export default function tryToDeclareSet(set, calls) {
  return (dispatch, getState) => {
    let state = getState();
    let cardsInPlay = state.cardsInPlay
    let currentPlayer = state.currentPlayer;

    let checkedCalls = calls
      .map(call => {
        let actualOwner = cardsInPlay.find(card => card.get('id') === call.get('id')).get('owner');

        return call.set('actualOwner', actualOwner);
      });

    let badCalls = checkedCalls.filter(call => call.get('owner') !== call.get('actualOwner'));

    if (badCalls.size) dispatch(bungleSet(set, badCalls.toJS()));
    else dispatch(declareSet(set));

    dispatch(removeSet(set));
    dispatch(manageTurn());
  };
}

function bungleSet(set, badCalls) {
  return (dispatch, getState) => {
    let state = getState();

    let currentPlayer = parseInt(state.currentPlayer, 10);
    let numberOfPlayers = state.numberOfPlayers;

    let nextPlayer = (currentPlayer + 1 > state.numberOfPlayers) ? '1' : String(currentPlayer + 1);

    dispatch(sendMessage(`${set} was bungled. ${JSON.stringify(badCalls)}`));
    dispatch(updateScore(state.currentTeam, -0.5));
    dispatch(passTurnToNextOpponent());
  }
}

function declareSet(set) {
  return (dispatch, getState) => {
    dispatch(sendMessage(`${set} was correctly called.`));
    dispatch(updateScore(getState().currentTeam, 1));
  }
}

function removeSet(set) {
  return {
    type: Constants.REMOVE_SET,
    set
  };
}

