export default [
  'START_GAME',
  'START_DECLARING_SET',
  'START_ASKING',
  'CANCEL_ASK_OR_DECLARE',
  'TAKE_CPU_TURN',
  'ASK_QUESTION',
  'REMOVE_SET',
  'CHANGE_PLAYER',
].reduce((memo, val) => Object.assign({ [val]: val }, memo), {});
