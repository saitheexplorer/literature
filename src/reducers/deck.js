import Immutable from 'seamless-immutable';

import Constants from 'constants';
import literatureDeck from 'utils/deck';

function deck(state = literatureDeck(), action) {
  let currentPlayer = 1;

  switch (action.type) {
    case Constants.START_GAME:
      // deal deck by assigning owners
      return state.map(card => {
        const newCard = card.merge({ owner: String(currentPlayer) });

        if (currentPlayer < action.numberOfPlayers) currentPlayer++;
        else currentPlayer = 1;

        return newCard;
      });

    case Constants.REMOVE_SET:
      return Immutable.from(state.filter(x => x.setName !== action.setName));

    case Constants.TRANSFER_CARD:
      return state.map(x => {
        if (x.id !== action.cardId) return x;

        return x.merge({ owner: action.askingPlayer });
      });

    default:
      return state;
  }
}

export default deck;
