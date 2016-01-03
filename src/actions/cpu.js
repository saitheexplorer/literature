import { shuffle } from 'lodash';
import { List, Map } from 'immutable';

import Constants from 'constants';

import askPlayer from 'actions/question';
import tryToDeclareSet from 'actions/set';
import sendMessage from 'actions/messages';
import { passTurnToNextTeammate, passTurnToNextOpponent } from 'actions/turn';
import { outOfCards } from 'actions';
import { endGame } from 'actions/game';

import { removePlayerFromPossibleOwners, simplifyPossibleOwners } from 'utils/memory';

export function takeCpuTurn() {
  return (dispatch, getState) => {
    let state = getState();
    let currentPlayer = state.currentPlayer;
    let cardsInPlay = state.cardsInPlay;
    let numberOfPlayers = state.numberOfPlayers;

    let cpuTeam = state.teams.get(state.currentTeam);
    let opposingTeam = state.teams.get(state.currentTeam === 'A' ? 'B' : 'A');

    let cpuHand = cardsInPlay.filter(card => card.get('owner') === currentPlayer);
    let cpuSets = cpuHand.map(card => card.get('set')).toSet();

    if (!cpuHand.size) passTurnToNextTeammate;

////////////////////////////////////////////////////////////////////////////////////

    let memory = getState().memoryDeck
      .map(card => {
        let cardInCpuHand = cpuHand.find(hCard => card.get('id') === hCard.get('id'));

        if (cardInCpuHand) return card.set('owner', currentPlayer);
        return removePlayerFromPossibleOwners(currentPlayer)(card);
      })
      .map(simplifyPossibleOwners)

    let activePlayers = cardsInPlay
      .groupBy(card => card.get('owner'))
      .keySeq()
      .toJS();

    // only ask players who still have cards and are on the other team
    let opponents = activePlayers.filter(player => opposingTeam.indexOf(player) > -1);

    // first declare any sets held completely in hand
    let mySetToDeclare = cpuHand
      .groupBy(card => card.get('set'))
      .filter(set => set.size === 6)
      .first()

    if (mySetToDeclare) {
      let callsToDeclare = mySetToDeclare.map(card => Map({id: card.get('id'), owner: currentPlayer})).toList();
      let setToDeclare = mySetToDeclare.toList().get(0).get('set');

      return dispatch(tryToDeclareSet(setToDeclare, callsToDeclare));
    }

    // next declare any sets held within the team
    let teamCallsToDeclare = memory
      .filter(card => card.get('owner'))
      .groupBy(card => card.get('set'))
      .filter(set => set.size === 6)
      .first();

    if (teamCallsToDeclare) return dispatch(tryToDeclareSet(teamCallsToDeclare.get(0).get('set'), teamCallsToDeclare));

    let askableCards = state.cardsInPlay
      .filter(card => card.get('owner') !== currentPlayer)
      .filter(card => cpuSets.has(card.get('set')))
      .sortBy(card => card.get('id'));

    let knownAskableCards = askableCards
      .map(card => memory.find(mCard => card.get('id') === mCard.get('id')))
      .filter(card => card.get('possibleOwners').size !== 6);

    // next take cards with known location
    let cardToTake = knownAskableCards
      .filter(card => card.get('owner'))
      .filter(card => opponents.indexOf(card.get('owner')) > -1)
      .first();

    if (cardToTake) return dispatch(askPlayer(currentPlayer, cardToTake.get('owner'), cardToTake.get('id')));

    // next make intelligent guess based on previous questions
    let cardToSmartGuess = knownAskableCards
      .map(card => card.set('possibleOwners', card.get('possibleOwners').filter(owner => opponents.indexOf(owner) > -1)))
      .filter(card => card.get('possibleOwners').size !== 0)
      .filter(card => card.get('possibleOwners').size !== 6)
      .sort(card => card.get('possibleOwners').size)
      .reverse()
      .first();

    if (cardToSmartGuess) return dispatch(askPlayer(currentPlayer, cardToSmartGuess.get('possibleOwners').first(), cardToSmartGuess.get('id')))

    // next make a wild guess
    let cardToWildGuess = shuffle(askableCards.toJS()).pop();
    let opponentToWildGuess = shuffle(opponents).pop();

    if (cardToWildGuess && opponentToWildGuess) return dispatch(askPlayer(currentPlayer, opponentToWildGuess, cardToWildGuess.id));

    // opponents have no cards, and cannot declare with 100% confidence
    // must declare by guessing

    let wildSetToDeclare = shuffle(cpuSets.toArray()).pop();
    let wildCallsToDeclare = memory
      .filter(card => card.get('set') === wildSetToDeclare)
      .map(call => {
        if (call.get('owner')) return call;

        return call.set('owner', shuffle(call.get('possibleOwners').toJS()).pop())
      });

    if (wildSetToDeclare && wildCallsToDeclare) dispatch(tryToDeclareSet(wildSetToDeclare, wildCallsToDeclare));
  };
}

function getHandByPlayer(cardsInPlay, player) {
  return cardsInPlay.filter(card => card.get('owner') === player);
}
