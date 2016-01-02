import { shuffle } from 'lodash';
import { List } from 'immutable';

import Constants from 'constants';

export function handleError(errorMessage) {
  return {
    type: Constants.HANDLE_ERROR,
    errorMessage
  }
}
