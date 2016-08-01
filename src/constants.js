export default [
  'START_GAME',
  'START_DECLARING_SET',
  'START_ASKING',
  'CANCEL_ASK_OR_DECLARE',
].reduce((memo, val) => Object.assign({ [val]: val }, memo), {});
