export default [
  'BUNGLE_SET',
  'CHANGE_TURN',
  'DECLARE_SET',
  'HANDLE_ERROR',
  'TRANSFER_CARD',
  'REMOVE_SET',
  'START_GAME',
  'UPDATE_SCORE'
].reduce((memo, val) => Object.assign({[val]: val}, memo), {});
