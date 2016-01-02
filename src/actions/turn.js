import Constants from 'constants';

import { changeTurn } from 'actions/game';

export function askPlayer(askingPlayer, askedPlayer, askedCard) {
  return (dispatch, getState) => {
    dispatch(askQuestion(askingPlayer, askedCard));

    let cardIndex = getState().cardsInPlay.findIndex(card => card.get('card') === askedCard && card.get('owner') === askedPlayer);

    if (cardIndex !== -1) dispatch(transferCard(askingPlayer, cardIndex, askedCard));
    else dispatch(changeTurn(askedPlayer));
  };
}

function askQuestion(askingPlayer, askedCard) {
  return {
    type: Constants.ASK_QUESTION,
    askingPlayer,
    askedCard
  };
}

function transferCard(askingPlayer, cardIndex, askedCard) {
  return {
    type: Constants.TRANSFER_CARD,
    askingPlayer,
    cardIndex,
    askedCard
  }
}
