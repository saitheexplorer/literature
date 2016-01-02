import Constants from 'constants';

export default function error(state = false, action) {
  switch (action.type) {
    case Constants.HANDLE_ERROR:
      return {errorMessage: action.errorMessage};

    default:
      return false;
  }
}
