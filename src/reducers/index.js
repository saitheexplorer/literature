import { combineReducers } from 'redux';
import Immutable, { Map, List, OrderedSet, Range, Set } from 'immutable';

import Constants from 'constants';
import LiteratureDeck, { Sets } from 'utils/deck';
import { cardFromId } from 'utils/card';

import messages from './messages';
import error from './errors';

import { gameStarted, score, gameEnded, numberOfTurns } from './game';
import { currentTeam, teams } from './teams';
import { currentPlayer, numberOfPlayers } from './players';
import { memoryDeck } from './memory';

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

export default combineReducers({
  error,
  numberOfPlayers,
  gameStarted,
  gameEnded,
  numberOfTurns,
  currentTeam,
  currentPlayer,
  score,
  cardsInPlay,
  setsDiscarded,
  memoryDeck,
  messages,
  teams
});

