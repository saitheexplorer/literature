import Constants from 'constants';

export function startDeclaringSet() {
  return {
    type: Constants.START_DECLARING_SET,
  };
}

export function startAsking() {
  return {
    type: Constants.START_ASKING,
  };
}

export function cancelAskOrDeclare() {
  return {
    type: Constants.CANCEL_ASK_OR_DECLARE,
  };
}

export function takeCpuTurn() {
  return {
    type: Constants.TAKE_CPU_TURN,
  };
}

export function askQuestion(player, card) {
  return {
    type: Constants.ASK_QUESTION,
    player,
    card,
  };
}
