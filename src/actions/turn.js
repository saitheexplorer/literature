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
