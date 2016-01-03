import React from 'react';
import { Map, Range } from 'immutable';

import Store from 'stores';

import tryToDeclareSet from 'actions/set';
import { handleError } from 'actions';

import { cardFromId } from 'utils/card';

export default class DeclareSetSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onDeclare = this.onDeclare.bind(this);

    this.state = {calls: Map()};
  }

  onDeclare() {
    if (this.state.calls.size !== 6) {
      return Store.dispatch(handleError('Declare all cards in the set.'));
    }

    Store.dispatch(tryToDeclareSet(this.props.set, this.state.calls.toList()));
    this.setState({calls: Map()})
  }

  onChange(e) {
    let event = e.target.value.split(',');

    let owner = event[0];
    let id = event[1];

    this.setState({calls: this.state.calls.set(id, Map({owner, id}))});
  }

  render() {
    let players = Range(1, this.props.numberOfPlayers + 1).toList();

    let cards = this.props.cardsToBeDeclared.map(card => {
      return (
        <div key={card.get('id')}>
          <p>{card.get('id')}</p>
          <select onChange={this.onChange}>
          {(() => {
            return players
              .map(player => <option key={player} value={[player, card.get('id')]}>Player {player}</option>)
              .unshift(<option>Select a player...</option>)
          })()}
          </select>
        </div>
      );
    });

    return (
      <div>
        {cards}
        <button onClick={this.onDeclare}>Declare Set</button>
      </div>
    );
  }
}
