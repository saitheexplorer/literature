export default [
  'ASK_QUESTION',
  'CANCEL_ASK_OR_DECLARE',
  'CHANGE_PLAYER',
  'CHANGE_ASKED_PLAYER',
  'CHANGE_ASKED_CARD',
  'REMOVE_SET',
  'START_ASKING',
  'START_DECLARING_SET',
  'START_GAME',
  'TAKE_CPU_TURN',
  'TRANSFER_CARD',
  'UPDATE_SCORE',
].reduce((memo, val) => Object.assign({ [val]: val }, memo), {});
