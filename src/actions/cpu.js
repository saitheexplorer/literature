import _ from 'lodash/fp';

const getOwner = _.get('owner');

export function takeCpuTurn() {
  return (dispatch, getState) => {
    const { memory, player, deck } = getState();

    const { currentPlayer } = player;

    const currentHand = deck.filter(x => x.owner === currentPlayer);

    const knownLocationCards = memory.filter(getOwner);
  };
}
