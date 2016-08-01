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

    default:
      return state;
  }
}

export default deck;