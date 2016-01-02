import { List } from 'immutable';

import Constants from 'constants';

export default function messages(state = List(), action) {
  switch (action.type) {
    case Constants.START_GAME:
      return state.unshift('Game started.');

    case Constants.ASK_QUESTION:
      return state.unshift(`Player ${action.askingPlayer} asked for ${action.askedCard}.`);

    case Constants.TRANSFER_CARD:
      return state.unshift(`Player ${action.askingPlayer} took ${action.askedCard}.`);

    case Constants.CHANGE_TURN:
      return state.unshift(`Move failed. It is now Player ${action.player}'s turn.`);

    case Constants.REMOVE_SET:
      return state.unshift(`${action.set} has been removed from play.`);

    default:
      return state;
  }
}
