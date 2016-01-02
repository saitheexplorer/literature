import { shuffle } from 'lodash';

import Constants from 'constants';

import { askPlayer } from 'actions/turn';

export function takeCpuTurn() {
  return (dispatch, getState) => {
    let state = getState();
    let currentPlayer = state.currentPlayer;
    let teams = state.teams.toJS();

    let opponents = teams[state.currentTeam === 'A' ? 'B' : 'A'];

    let cpuHand = state.cardsInPlay.filter(card => card.get('owner') === currentPlayer);
    let cpuSets = cpuHand.map(card => card.get('set')).toSet();

    let memory = state.memoryDeck;

    let askableCards = state
      .cardsInPlay
      .filterNot(card => card.get('owner') === currentPlayer)
      .filter(card => cpuSets.has(card.get('set')))
      .sortBy(card => card.get('suit') + card.get('rank'));

    let knownCards = memory.filter(card => askableCards.find(mCard => card.get('card') === mCard.get('card')));

    // first take cards with known location
    let cardToTake = knownCards
      .filter(card => card.get('owner'))
      .filter(card => opponents.indexOf(card.get('owner')) > -1)
      .first();

    if (cardToTake) return dispatch(askPlayer(currentPlayer, cardToTake.get('owner'), cardToTake.get('card')));

    // last make a wild guess
    let cardToWildGuess = knownCards.first();
    let opponentToWildGuess = shuffle(opponents).pop();

    if (cardToWildGuess) return dispatch(askPlayer(currentPlayer, opponentToWildGuess, cardToWildGuess.get('card')));

    console.log('no more moves');
  };
}
