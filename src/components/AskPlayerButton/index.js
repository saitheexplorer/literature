import React from 'react';
import { Range } from 'immutable';

import Store from 'stores';
import { askPlayer, handleError } from 'actions';

export default class AskPlayerButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {player: null, card: null};
    this.onPlayerChange = this.onPlayerChange.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
    this.onAsk = this.onAsk.bind(this);
  }

  onPlayerChange(event) {
    this.setState({player: event.target.value});
  }

  onCardChange(event) {
    this.setState({card: event.target.value});
  }

  onAsk() {
    if (!this.state.card || !this.state.player) return Store.dispatch(handleError('Select a player to ask and card to ask for.'));

    Store.dispatch(askPlayer('1', this.state.player, this.state.card));
  }

  render() {
    let players = Range(2, this.props.numberOfPlayers + 1, 2)
      .map(player => <option key={player} value={String(player)}>Player {player}</option>);


    let myHand = this.props.myHand;
    let mySets = myHand.groupBy(card => card.get('set')).keySeq();
    let myCards = myHand.map(card => card.get('card')).toJS();

    let askableCards = this.props.cardsInPlay
      .filter(card => myCards.indexOf(card.get('card')) === -1)
      .filter(card => mySets.includes(card.get('set')))
      .sortBy(card => card.get('suit') + card.get('rank'))
      .map(card => <option key={card.get('card')} value={card.get('card')}>{card.get('card')}</option>);

    return (
      <div>
        <select onChange={this.onPlayerChange}>
          <option value="">Select a player...</option>
          {players}
        </select>

        <select onChange={this.onCardChange}>
          <option value="">Select a card to ask for...</option>
          {askableCards}
        </select>

        <button onClick={this.onAsk}>Ask</button>
      </div>
    );
  }
}
