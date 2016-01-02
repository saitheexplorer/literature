import React from 'react';

export default class GameInfo extends React.Component {
  render() {
    let score = this.props.score.entrySeq().map(entry => <p key={entry[0]}>Team {entry[0]} - {entry[1]}</p>);

    return (
      <div>
        <h1>Info</h1>
        <p>{this.props.cardsInPlay.size} cards in play.</p>
        <p>Sets discarded: {this.props.setsDiscarded.join(', ')}</p>
        <p>Current turn: {this.props.currentTurn} </p>

        <h4>Score</h4>
        {score}
      </div>
    );
  }
}
