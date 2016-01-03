import Constants from 'constants';

export function transferCard(askingPlayer, cardIndex, askedCard) {
  return {
    type: Constants.TRANSFER_CARD,
    askingPlayer,
    cardIndex,
    askedCard
  }
}
