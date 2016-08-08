import _ from 'lodash/fp';

import { askPlayer } from 'actions/question';

const getId = _.get('id');
const getOwner = _.get('owner');
const getSetName = _.get('setName');

const getPlayerHand = (player, deck) => deck.filter(x => x.owner === player);

const getPlayerSets = _.compose(
  _.uniq,
  _.map(getSetName),
  getPlayerHand
);

const getAskableCards = (player, deck) => {
  const playerSets = getPlayerSets(player, deck);

  return deck
    .filter(x => x.owner !== player)
    .filter(x => _.includes(x.setName, playerSets));
};

const getCardsInCommon = _.intersectionBy(getId);

export function takeCpuTurn() {
  return (dispatch, getState) => {
    const { memory, game, deck } = getState();
    const { currentPlayer } = game;

    const currentHand = getPlayerHand(currentPlayer, deck);
    const askableCards = getAskableCards(currentPlayer, deck);
    const knownLocationCards = memory.filter(getOwner);

    const knownAskableCards = getCardsInCommon(knownLocationCards, askableCards);

    console.log(knownLocationCards, askableCards, knownAskableCards);

    if (knownAskableCards.length) {
      const [ cardToTake ] = knownAskableCards;

      return dispatch(askPlayer(currentPlayer, cardToTake.id, cardToTake.owner));
    }
  };
}
