import Constants from 'constants';

import { updateScore, changeTurn } from 'actions/game';

export function tryToDeclareSet(set, calls) {
  return (dispatch, getState) => {
    let state = getState();
    let cardsInPlay = state.cardsInPlay
    let currentPlayer = state.currentPlayer;

    let cardsInSet = cardsInPlay.filter(card => card.get('set') === set);

    let checkedCalls = calls
      .map(call => {
        call.actualOwner = cardsInSet.find(card => card.get('id') === call.id).get('owner');

        return call;
      });

    let badCalls = checkedCalls.filter(call => call.owner !== call.actualOwner);

    if (badCalls.size) dispatch(bungleSet())
    else dispatch(declareSet());

    dispatch(removeSet(set));
  };
}

function bungleSet() {
  return (dispatch, getState) => {
    let state = getState();

    let currentPlayer = parseInt(state.currentPlayer, 10);
    let numberOfPlayers = state.numberOfPlayers;

    let nextPlayer = (currentPlayer + 1 > state.numberOfPlayers) ? '1' : String(currentPlayer + 1);

    dispatch(updateScore(state.currentTeam, -0.5));
    dispatch(changeTurn(nextPlayer));
  }
}

function declareSet() {
  return (dispatch, getState) => dispatch(updateScore(getState().currentTeam, 1));
}

function removeSet(set) {
  return {
    type: Constants.REMOVE_SET,
    set
  };
}

