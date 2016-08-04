// import Immutable from 'seamless-immutable';

import Constants from 'constants';
import literatureDeck from 'utils/deck';

export default function memory(state = literatureDeck(), action) {
  switch (action.type) {
    case Constants.START_GAME:
      return state.map(x =>
        x.merge({
          possibleOwners: Array.from({ length: action.numberOfPlayers }, (v, k) => String(k + 1)),
        })
      );

    case Constants.TRANSFER_CARD:
      return state.map(x => {
        if (x.id !== action.cardId) return x;

        return x.merge({ owner: action.askingPlayer, possibleOwners: [] });
      });

    case Constants.ASK_QUESTION:
      return state.map(x => {
        if (x.id !== action.cardId) return x;

        return x.merge({ possibleOwners: x.possibleOwners.filter(o => o !== action.askingPlayer) });
      });

    default:
      return state;
  }
}
