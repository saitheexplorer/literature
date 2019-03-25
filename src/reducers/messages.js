import Constants from '../constants';

export default function messages(state = [], action) {
  switch (action.type) {
    case Constants.SEND_MESSAGE:
      return [action.message, ...state];

    case Constants.START_GAME:
      return ['Game started.'];

    case Constants.ASK_QUESTION:
      return [
        `Player ${action.askingPlayer} asked Player ${action.askedPlayer} for ${
          action.askedCard
        }.`,
        ...state,
      ];

    case Constants.TRANSFER_CARD:
      return [
        `Player ${action.askingPlayer} took ${action.askedCard}.`,
        ...state,
      ];

    case Constants.CHANGE_TURN:
      return [`It is now Player ${action.player}'s turn.`, ...state];

    case Constants.REMOVE_SET:
      return [`${action.set} has been removed from play.`, ...state];

    case Constants.UPDATE_SCORE:
      return ['Set declared.', ...state];

    case Constants.DENY_QUESTION:
      return ['Move failed.', ...state];

    default:
      return state;
  }
}
