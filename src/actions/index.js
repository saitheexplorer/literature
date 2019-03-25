import Constants from '../constants';

export function handleError(errorMessage) {
  return {
    type: Constants.HANDLE_ERROR,
    errorMessage,
  };
}

export function outOfCards(player) {
  return {
    type: Constants.OUT_OF_CARDS,
    player,
  };
}
