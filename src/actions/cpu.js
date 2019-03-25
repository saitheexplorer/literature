import { shuffle } from 'lodash';
import { Map } from 'immutable';

import askPlayer from '../actions/question';
import tryToDeclareSet from '../actions/set';
import { passTurnToNextTeammate } from '../actions/turn';

import {
  removePlayerFromPossibleOwners,
  simplifyPossibleOwners,
} from '../utils/memory';

export function takeCpuTurn() {
  return (dispatch, getState) => {
    const state = getState();

    const currentPlayer = state.currentPlayer;
    const cardsInPlay = state.cardsInPlay;

    const opposingTeam = state.teams.get(state.currentTeam === 'A' ? 'B' : 'A');

    const cpuHand = cardsInPlay.filter(
      card => card.get('owner') === currentPlayer
    );
    const cpuSets = cpuHand.map(card => card.get('set')).toSet();

    if (!cpuHand.size) passTurnToNextTeammate();

    ////////////////////////////////////////////////////////////////////////////////////

    console.log(getState().memoryDeck.toJSON());

    const memory = getState()
      .memoryDeck.map(card => {
        const cardInCpuHand = cpuHand.find(
          hCard => card.get('id') === hCard.get('id')
        );

        if (cardInCpuHand) return card.set('owner', currentPlayer);
        return removePlayerFromPossibleOwners(currentPlayer)(card);
      })
      .map(simplifyPossibleOwners);

    const activePlayers = cardsInPlay
      .groupBy(card => card.get('owner'))
      .keySeq()
      .toJS();

    // only ask players who still have cards and are on the other team
    const opponents = activePlayers.filter(
      player => opposingTeam.indexOf(player) > -1
    );

    // first declare any sets held completely in hand
    const mySetToDeclare = cpuHand
      .groupBy(card => card.get('set'))
      .filter(set => set.size === 6)
      .first();

    if (mySetToDeclare) {
      const callsToDeclare = mySetToDeclare
        .map(card => Map({ id: card.get('id'), owner: currentPlayer }))
        .toList();
      const setToDeclare = mySetToDeclare
        .toList()
        .get(0)
        .get('set');

      return dispatch(tryToDeclareSet(setToDeclare, callsToDeclare));
    }

    // next declare any sets held within the team
    const teamCallsToDeclare = memory
      .filter(card => card.get('owner'))
      .groupBy(card => card.get('set'))
      .filter(set => set.size === 6)
      .first();

    if (teamCallsToDeclare)
      return dispatch(
        tryToDeclareSet(
          teamCallsToDeclare.get(0).get('set'),
          teamCallsToDeclare
        )
      );

    const askableCards = state.cardsInPlay
      .filter(card => card.get('owner') !== currentPlayer)
      .filter(card => cpuSets.has(card.get('set')))
      .sortBy(card => card.get('id'));

    const knownAskableCards = askableCards
      .map(card => memory.find(mCard => card.get('id') === mCard.get('id')))
      .filter(card => card.get('possibleOwners').size !== 6);

    // next take cards with known location
    const cardToTake = knownAskableCards
      .filter(card => card.get('owner'))
      .filter(card => opponents.indexOf(card.get('owner')) > -1)
      .first();

    if (cardToTake)
      return dispatch(
        askPlayer(currentPlayer, cardToTake.get('owner'), cardToTake.get('id'))
      );

    // TODO: If teammate has 5 members of set, and player has 1, ask dummy question to reveal card location

    // next make intelligent guess based on previous questions
    const cardToSmartGuess = knownAskableCards
      .map(card =>
        card.set(
          'possibleOwners',
          card
            .get('possibleOwners')
            .filter(owner => opponents.indexOf(owner) > -1)
        )
      )
      .filter(card => card.get('possibleOwners').size !== 0)
      .filter(card => card.get('possibleOwners').size !== 6)
      .sort(card => card.get('possibleOwners').size)
      .reverse()
      .first();

    if (cardToSmartGuess)
      return dispatch(
        askPlayer(
          currentPlayer,
          cardToSmartGuess.get('possibleOwners').first(),
          cardToSmartGuess.get('id')
        )
      );

    // next make a wild guess
    const cardToWildGuess = shuffle(askableCards.toJS()).pop();
    const opponentToWildGuess = shuffle(opponents).pop();

    if (cardToWildGuess && opponentToWildGuess)
      return dispatch(
        askPlayer(currentPlayer, opponentToWildGuess, cardToWildGuess.id)
      );

    // opponents have no cards, and cannot declare with 100% confidence
    // must declare by guessing

    const wildSetToDeclare = shuffle(cpuSets.toArray()).pop();
    const wildCallsToDeclare = memory
      .filter(card => card.get('set') === wildSetToDeclare)
      .map(call => {
        if (call.get('owner')) return call;

        return call.set(
          'owner',
          shuffle(call.get('possibleOwners').toJS()).pop()
        );
      });

    if (wildSetToDeclare && wildCallsToDeclare)
      dispatch(tryToDeclareSet(wildSetToDeclare, wildCallsToDeclare));
  };
}
