import { List, Range } from 'immutable';

import Constants from 'constants';
import LiteratureDeck from 'utils/deck';
import { removePlayerFromPossibleOwners, simplifyPossibleOwners } from 'utils/memory';

export function memoryDeck(state = List(LiteratureDeck), action) {
  let possibleOwners;
  let updatedPossibleOwners;

  switch (action.type) {
    case Constants.START_GAME:
      return state.map(card => card.set('possibleOwners', Range(1, action.numberOfPlayers + 1).toList().map(String)));

    case Constants.TRANSFER_CARD:
      let transferCardIndex = state.findIndex(card => card.get('card') === action.askedCard);

      return state.setIn([transferCardIndex, 'owner'], action.askingPlayer).setIn([transferCardIndex, 'possibleOwners'], List());

    case Constants.ASK_QUESTION:
      let askedCardIndex = state.findIndex(card => card.get('id') === action.askedCard);
      let askedCard = state.get(askedCardIndex);

      if (askedCard.get('owner')) return state;

      return state
        .set(askedCardIndex, removePlayerFromPossibleOwners(action.askingPlayer)(askedCard))
        .map(simplifyPossibleOwners);

    case Constants.DENY_QUESTION:
      let deniedCardIndex = state.findIndex(card => card.get('id') === action.askedCard);
      let deniedCard = state.get(deniedCardIndex);

      if (deniedCard.get('owner')) return state;

      return state
        .set(deniedCardIndex, removePlayerFromPossibleOwners(action.askedPlayer)(deniedCard))
        .map(simplifyPossibleOwners);

    case Constants.REMOVE_SET:
      return state.filter(card => card.get('set') !== action.set);

    case Constants.OUT_OF_CARDS:
      return state
        .map(removePlayerFromPossibleOwners(action.player))
        .map(simplifyPossibleOwners);

    default:
      return state;
  }
}
