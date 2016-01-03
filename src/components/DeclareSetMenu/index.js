import React from 'react';
import { Map, List, Range } from 'immutable';

import Store from 'stores';

import DeclareSetSelect from 'components/DeclareSetSelect';

import { handleError } from 'actions';

import { Sets } from 'utils/deck';

export default class DeclareSetMenu extends React.Component {
  constructor(props) {
    super(props);

    this.onSetChange = this.onSetChange.bind(this);
    this.state = {set: null};
  }

  onSetChange(event) {
    this.setState({set: event.target.value});
  }

  render() {
    let setOptions = Sets
      .filter(set => !this.props.setsDiscarded.has(set))
      .map(set => <option key={set} value={set}>{set}</option>);

    return (
      <div>
        <select onChange={this.onSetChange}>
          <option value="">Select a set...</option>
          {setOptions}
        </select>

        {(() => {
          if (!this.state.set) return false;

          let cardsToBeDeclared = this.props.cardsInPlay
            .filter(card => card.get('set') === this.state.set)
            .sortBy(card => card.get('id'));

          return (
            <div>
              <DeclareSetSelect
                cardsToBeDeclared={cardsToBeDeclared}
                numberOfPlayers={this.props.numberOfPlayers}
                set={this.state.set}
              />
            </div>
          );
        })()}

      </div>
    );
  }
}
