import React from 'react';

const GameInfo = props => {
  return (
    <div>
      <h1>Info</h1>
      <p>{props.cardsInPlay.size} cards in play.</p>
      <p>Sets discarded: {props.setsDiscarded.join(', ')}</p>
      <p>Current turn: {props.currentTurn} </p>

      <h4>Score</h4>
      <p>Team A: {props.score.A}</p>
      <p>Team B: {props.score.B}</p>
    </div>
  );
};

export default GameInfo;
