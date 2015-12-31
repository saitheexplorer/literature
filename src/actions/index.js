import Constants from 'constants';

export function changeTurn(player) {
  return {
    type: Constants.CHANGE_TURN,
    player
  };
}

export function removeSet(set) {
  return {
    type: Constants.REMOVE_SET,
    set
  };
}

export function updateScore(team, diff) {
  return {
    type: Constants.UPDATE_SCORE,
    diff
  }
}

export function startGame(numberOfPlayers) {
  return {
    type: Constants.START_GAME,
    numberOfPlayers
  };
}

export function handleError(errorMessage) {
  return {
    type: Constants.HANDLE_ERROR,
    errorMessage
  }
}

export function transferCard(askingPlayer, cardIndex, askedCard) {
  return {
    type: Constants.TRANSFER_CARD,
    askingPlayer,
    cardIndex,
    askedCard
  }
}

// composed
export function askPlayer(askingPlayer, askedPlayer, askedCard) {
  return (dispatch, getState) => {
    let cardIndex = getState().cardsInPlay.findIndex(card => card.get('card') === askedCard && card.get('owner') === askedPlayer);

    if (cardIndex !== -1) dispatch(transferCard(askingPlayer, cardIndex, askedCard));
    else dispatch(changeTurn(askedPlayer));
  };
}

// export function declareSet(player, set, calls) {
//   return (dispatch, getState) => {
//     dispatch(removeSet(set));

//     let team = parseInt(player, 10) % 2 === 1 ? 'A' : 'B';

//     let state = getState();
//     let cardsInPlay = state.cardsInPlay;

//     let incorrectCalls = calls.filter(call => cardsInPlay.find(card => card.get('card') === call.card && card.get('owner') !== call.owner));

//     console.log(calls.toJS());
//     console.log(incorrectCalls);

//     console.log(team, incorrectCalls.size ? -0.5 : 1);

//     return;

//     let isBungled = !!incorrectCalls.size;

//     dispatch(updateScore(team, isBungled ? -0.5 : 1));

//     if (isBungled) dispatch(changeTurn(parseInt(state.currentTurn, 10) - 1));
//   };
// }

// to be composed
export function bungleSet(player, set) {
  return [{
    type: Constants.BUNGLE_SET,
    player
  }, {
    type: Constants.REMOVE_SET,
    set
  }, {
    type: Constants.CHANGE_TURN,
    player
  }];
}

