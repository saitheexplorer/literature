import Constants from 'constants';
import { changeCurrentPlayer } from 'actions/game';
import { transferCard } from 'actions/deck';

export function startDeclaringSet() {
  return {
    type: Constants.START_DECLARING_SET,
  };
}

export function startAsking() {
  return {
    type: Constants.START_ASKING,
  };
}

export function cancelAskOrDeclare() {
  return {
    type: Constants.CANCEL_ASK_OR_DECLARE,
  };
}

export function changeAskedCard(askedCard) {
  return {
    type: Constants.CHANGE_ASKED_CARD,
    askedCard,
  };
}

export function changeAskedPlayer(askedPlayer) {
  return {
    type: Constants.CHANGE_ASKED_PLAYER,
    askedPlayer,
  };
}

export function askQuestion(askingPlayer, cardId) {
  return {
    type: Constants.ASK_QUESTION,
    askingPlayer,
    cardId,
  };
}

export function denyQuestion(askedPlayer) {
  return dispatch => dispatch(changeCurrentPlayer(askedPlayer));
}

export function askPlayerQuestion() {
  return (dispatch, getState) => {
    dispatch(cancelAskOrDeclare());

    const { deck, player, question } = getState();

    const { askedPlayer, askedCard } = question;
    const { currentPlayer } = player;

    dispatch(askQuestion(currentPlayer, askedCard));

    // find if card is still in deck and has the right owner
    const cardCheck = deck.filter(c => c.id === askedCard && c.owner === askedPlayer);

    if (!cardCheck.length) return dispatch(denyQuestion(askedPlayer));

    return dispatch(transferCard(currentPlayer, askedCard));
  };
}
