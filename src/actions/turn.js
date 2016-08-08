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

export function manageTurn() {
  // perform clean up at the end of each question resolution

  return (dispatch) => {
    dispatch(cancelAskOrDeclare());
  };
}
