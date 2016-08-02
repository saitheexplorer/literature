import Constants from 'constants';

export function removeSet(setName) {
  return {
    type: Constants.REMOVE_SET,
    setName,
  };
}
