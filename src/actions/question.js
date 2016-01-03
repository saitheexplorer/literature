import Constants from 'constants';

import manageTurn, { changeTurn } from 'actions/turn';
import { transferCard } from 'actions/card';

export default function askPlayer(askingPlayer, askedPlayer, askedCard) {
  return (dispatch, getState) => {
    dispatch(askQuestion(askingPlayer, askedCard, askedPlayer));

    let cardIndex = getState().cardsInPlay.findIndex(card => card.get('card') === askedCard && card.get('owner') === askedPlayer);

    if (cardIndex !== -1) dispatch(transferCard(askingPlayer, cardIndex, askedCard));

    else {
      dispatch(denyQuestion(askingPlayer, askedCard, askedPlayer));
      dispatch(changeTurn(askedPlayer));
    }

    dispatch(manageTurn());
  };
}

function askQuestion(askingPlayer, askedCard, askedPlayer) {
  return {
    type: Constants.ASK_QUESTION,
    askingPlayer,
    askedCard,
    askedPlayer
  };
}

function denyQuestion(askingPlayer, askedCard, askedPlayer) {
  return {
    type: Constants.DENY_QUESTION,
    askingPlayer,
    askedCard,
    askedPlayer
  };
}
