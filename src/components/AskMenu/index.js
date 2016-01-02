import React from 'react';
import { Range } from 'immutable';

import Store from 'stores';
import { askPlayer } from 'actions/turn';
import { handleError } from 'actions/index';

export default class AskMenu extends React.Component {
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
    return (
      <div>
        <select onChange={this.onPlayerChange}>
          <option value="">Select a player...</option>
          {this.props.opponents}
        </select>

        <select onChange={this.onCardChange}>
          <option value="">Select a card to ask for...</option>
          {this.props.askableCards}
        </select>

        <button onClick={this.onAsk}>Ask</button>
      </div>
    );
  }
}
