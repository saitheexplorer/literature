import Constants from 'constants';

import { transferCard } from 'actions/deck';
import { changeTurn } from 'actions/game';
import { manageTurn } from 'actions/turn';

function askQuestion({ askingPlayer, cardId, askedPlayer }) {
  return {
    type: Constants.ASK_QUESTION,
    askingPlayer,
    cardId,
    askedPlayer,
  };
}

function denyQuestion(askingPlayer, cardId, askedPlayer) {
  return {
    type: Constants.DENY_QUESTION,
    askingPlayer,
    cardId,
    askedPlayer,
  };
}

export function askPlayer(askingPlayer, askedCard, askedPlayer) {
  return (dispatch, getState) => {
    dispatch(askQuestion({ askingPlayer, cardId: askedCard, askedPlayer }));

    const { deck } = getState();

    console.log(deck);

    // find if card is still in deck and has the right owner
    const cardCheck = deck.filter(c => c.id === askedCard && c.owner === askedPlayer);

    if (cardCheck.length) dispatch(transferCard({ askingPlayer, cardId: askedCard }));
    else {
      dispatch(denyQuestion(askingPlayer, askedCard, askedPlayer));
      dispatch(changeTurn(askedPlayer));
    }

    dispatch(manageTurn());
  };
}

