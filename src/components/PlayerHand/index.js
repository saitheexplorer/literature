import React from 'react';

export default class PlayerHand extends React.Component {
  render() {
    let hand = this.props.hand;

    // if (this.props.player !== '1') return <p>Player {this.props.player} - {hand.size} cards remaining.</p>;

    let cards = hand
      .sortBy(card => card.get('suit') + card.get('rank'))
      .map(card => <li key={card.get('card')}>{card.get('card')}</li>);

    return (
      <div>
        <p>Player {this.props.player} Cards:</p>
        <ul>{cards}</ul>
      </div>
    );
  }
}
