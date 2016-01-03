export default [
  'ASK_QUESTION',
  'BUNGLE_SET',
  'CHANGE_TURN',
  'DECLARE_SET',
  'DENY_QUESTION',
  'END_GAME',
  'HANDLE_ERROR',
  'OUT_OF_CARDS',
  'REMOVE_SET',
  'SEND_MESSAGE',
  'START_GAME',
  'TRANSFER_CARD',
  'UPDATE_SCORE'
].reduce((memo, val) => Object.assign({[val]: val}, memo), {});
