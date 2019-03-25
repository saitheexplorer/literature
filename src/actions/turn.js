import Constants from '../constants';

import { endGame } from '../actions/game';
import { outOfCards } from '../actions';

export default function manageTurn() {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlayer = state.currentPlayer;
    const cardsInPlay = state.cardsInPlay;

    // if no cards are in play, end game
    if (!cardsInPlay.size) return dispatch(endGame());

    const currentTeam = state.teams.get(state.currentTeam);
    const opposingTeam = state.teams.get(state.currentTeam === 'A' ? 'B' : 'A');

    // notify state of all players without cards
    currentTeam.concat(opposingTeam).forEach(player => {
      const hand = cardsInPlay.filter(card => card.get('owner') === player);

      if (!hand.size) dispatch(outOfCards(player));
    });

    // if team has no cards, pass turn to opponent
    const teamCards = cardsInPlay.filter(
      card => opposingTeam.indexOf(card.get('owner')) === -1
    );
    if (teamCards.size === 0) return dispatch(passTurnToNextOpponent());

    // if current player is out of cards, pass turn to next teammate
    const currentHand = cardsInPlay.filter(
      card => card.get('owner') === currentPlayer
    );
    if (!currentHand.size) dispatch(passTurnToNextTeammate());
  };
}

export function passTurnToNextTeammate() {
  return (dispatch, getState) => {
    let state = getState();

    let currentPlayer = state.currentPlayer;
    let teams = state.teams;

    let teammates = teams.get(state.currentTeam);

    let currentPlayerIndex = teammates.indexOf(currentPlayer);
    let nextTeammateIndex = currentPlayerIndex + 1;

    let nextTeammate = teammates[nextTeammateIndex]
      ? teammates[nextTeammateIndex]
      : teammates[0];

    dispatch(changeTurn(nextTeammate));
  };
}

export function passTurnToNextOpponent() {
  return (dispatch, getState) => {
    let state = getState();

    let currentPlayer = state.currentPlayer;
    let nextPlayerTmp = parseInt(currentPlayer) + 1;

    let nextPlayer =
      nextPlayerTmp > state.numberOfPlayers ? '1' : String(nextPlayerTmp);

    dispatch(changeTurn(nextPlayer));
  };
}

export function changeTurn(player) {
  return {
    type: Constants.CHANGE_TURN,
    player,
  };
}
