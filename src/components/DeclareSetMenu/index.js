import React from 'react';
import { Map, List, Range } from 'immutable';

import Store from 'stores';
import { declareSet, handleError } from 'actions';
import { Sets } from 'utils/deck';

export default class DeclareSetMenu extends React.Component {
  constructor(props) {
    super(props);

    this.onSetChange = this.onSetChange.bind(this);
    this.onDeclare = this.onDeclare.bind(this);
    this.onCallChange = this.onCallChange.bind(this);
    this.state = {set: null, calls: Map()};
  }

  onDeclare() {
    if (!this.state.set) return Store.dispatch(handleError('Select a valid set.'));
    if (this.state.calls.size !== 6) {
      console.log(this.state.calls.size);
      console.log(this.state.calls);
      // return Store.dispatch(handleError('Declare all cards in the set.'));
    }

    let set = this.state.set;
    let suit = set.split(' ')[1];

    let calls = this.state.calls.valueSeq();

    Store.dispatch(declareSet(this.props.currentTurn, set, calls));
  }

  onSetChange(event) {
    this.setState({set: event.target.value});
  }

  onCallChange(event) {
    let owner = event.target.value[0];
    let rank = event.target.value[2];
    let set = this.state.set;
    let suit = set.split(' ')[1];

    let calls = this.state.calls.set(rank, {rank, owner, suit, card: suit + rank});

    this.setState({calls});
  }

  render() {
    let setOptions = Sets
      .filter(set => !this.props.discardedSets.has(set))
      .map(set => <option key={set} value={set}>{set}</option>);

    return (
      <div>
        <select onChange={this.onSetChange}>
          <option value="">Select a set...</option>
          {setOptions}
        </select>

        {(() => {
          if (!this.state.set) return false;

          let cardsToBeDeclared = this.state.set.indexOf('minor') > -1 ? Range(3, 9) : Range(9, 15);

          return (
            <ul>
              {cardsToBeDeclared.map(rank => {
                return (
                  <div key={rank}>
                    <p>{rank}</p>
                    <select onChange={this.onCallChange}>
                      <option>Select a player...</option>
                      {Range(1, this.props.numberOfPlayers + 1).map(player => <option key={player} value={[player, rank]}>Player {player}</option>)}
                    </select>
                  </div>
                );
              })}
            </ul>
          );
        })()}

        <button onClick={this.onDeclare}>Declare Set</button>
      </div>
    );
  }
}
