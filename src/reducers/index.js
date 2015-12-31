import { combineReducers } from 'redux';
import Immutable, { Map, List, OrderedSet, Set } from 'immutable';

import Constants from 'constants';
import LiteratureDeck, { Sets } from 'utils/deck';

function gameStarted(state = false, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return true;

    default:
      return state;
  }
}

function numberOfPlayers(state = 0, action) {
  switch (action.type) {
    case Constants.START_GAME:
      return action.numberOfPlayers;

    default:
      return state;
  }
}

function currentTurn(state = '1', action) {
  switch (action.type) {
    case Constants.CHANGE_TURN:
      return action.player;

    default:
      return state;
  }
}

function score(state = Map({A: 0, B: 0}), action) {
  let team = action.player % 2 === 1 ? 'A' : 'B';
  let score = state.get(team);

  switch (action.type) {
    case Constants.BUNGLE_SET:
      return state.set(team, score - 0.5);

    case Constants.DECLARE_SET:
      return state.set(team, score + 1);

    default:
      return state;
  }
}

function cardsInPlay(state = List(LiteratureDeck), action) {
  switch (action.type) {
    case Constants.START_GAME:
      let currentPlayer = 1;

      return state.map(card => {
        let newCard = card.set('owner', String(currentPlayer));

        if (currentPlayer < action.numberOfPlayers) currentPlayer++;
        else currentPlayer = 1;

        return newCard;
      });

    case Constants.TRANSFER_CARD:
      return state.setIn([action.cardIndex, 'owner'], action.askingPlayer);

    case Constants.REMOVE_SET:
      return state.filter(card => card.get('set') !== action.set);

    default:
      return state;
  }
}

function setsDiscarded(state = Set(), action) {
  switch (action.type) {
    case Constants.REMOVE_SET:
      return state.add(action.set);

    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case Constants.HANDLE_ERROR:
      return {errorMessage: action.errorMessage};

    default:
      return false;
  }
}

function memory(state = Map(), action) {
  switch (action.type) {
    case Constants.TRANSFER_CARD:
      return state.set(action.askedCard, action.askingPlayer);

    default:
      return state;
  }
}

export default combineReducers({
  error,
  numberOfPlayers,
  gameStarted,
  currentTurn,
  score,
  cardsInPlay,
  setsDiscarded,
  memory
});

