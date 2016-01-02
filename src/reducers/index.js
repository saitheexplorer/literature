import { combineReducers } from 'redux';
import Immutable, { Map, List, OrderedSet, Range, Set } from 'immutable';

import Constants from 'constants';
import LiteratureDeck, { Sets } from 'utils/deck';
import { cardFromId } from 'utils/card';

import messages from './messages';
import error from './errors';
import { gameStarted, numberOfPlayers, currentTeam, currentPlayer, teams, score } from './game';

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

function memoryDeck(state = List(LiteratureDeck), action) {
  switch (action.type) {
    case Constants.START_GAME:
      return state.map(card => card.set('possibleOwners', Range(1, action.numberOfPlayers + 1).toJS()));

    case Constants.TRANSFER_CARD:
      let transferCardIndex = state.findIndex(card => card.get('card') === action.askedCard);

      return state.setIn([transferCardIndex, 'owner'], action.askingPlayer);

    case Constants.ASK_QUESTION:
      let askedCardIndex = state.findIndex(card => card.get('card') === action.askedCard);
      let askedCard = state.get(askedCardIndex);
      let askedSet = askedCard.get('set');

      return state;

    default:
      return state;
  }
}

function memorySets(state = Map(), action) {
  switch (action.type) {
    case Constants.ASK_QUESTION:
      let askedCard = cardFromId(action.askedCard);
      let askedSet = askedCard.get('set');
      let knownSets = state.get(action.askingPlayer, Set());
      let updatedSets = knownSets.add(askedSet);

      return state.set(action.askingPlayer, updatedSets);

    default:
      return state;
  }
}

export default combineReducers({
  error,
  numberOfPlayers,
  gameStarted,
  currentTeam,
  currentPlayer,
  score,
  cardsInPlay,
  setsDiscarded,
  memoryDeck,
  memorySets,
  messages,
  teams
});

