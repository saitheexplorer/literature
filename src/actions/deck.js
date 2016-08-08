import Constants from 'constants';

export function transferCard({ askingPlayer, cardId }) {
  return {
    type: Constants.TRANSFER_CARD,
    askingPlayer,
    cardId,
  };
}

export function removeSet(setName) {
  return {
    type: Constants.REMOVE_SET,
    setName,
  };
}
