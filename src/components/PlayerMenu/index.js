import React from 'react';
import { Range } from 'immutable';

import Store from 'stores';
import { askPlayer, handleError } from 'actions';

import DeclareSetMenu from 'components/DeclareSetMenu';
import AskMenu from 'components/AskMenu';
import Button from 'components/Button';

export default class PlayerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isAsking: false, isDeclaring: false};

    this.onAsk = this.onAsk.bind(this);
    this.onDeclare = this.onDeclare.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }


  onAsk() {
    this.setState({isAsking: true, isDeclaring: false});
  }

  onDeclare() {
    this.setState({isDeclaring: true, isAsking: false});
  }

  onCancel() {
    this.setState({isDeclaring: false, isAsking: false});
  }

  render() {
    if (!this.state.isDeclaring && !this.state.isAsking) return (
      <div>
        <button onClick={this.onAsk}>Ask</button>
        {<button onClick={this.onDeclare}>Declare</button>}
      </div>
    );

    if (this.state.isDeclaring) return (
      <div>
        <DeclareSetMenu
          setsDiscarded={this.props.setsDiscarded}
          cardsInPlay={this.props.cardsInPlay}
          numberOfPlayers={this.props.numberOfPlayers}
          currentTurn={this.props.currentTurn}
        />
        <Button onClick={this.onCancel} text={"Cancel"} />
      </div>
    );

    let opponents = Range(2, this.props.numberOfPlayers + 1, 2).map(player => <option key={player} value={String(player)}>Player {player}</option>);

    let myHand = this.props.myHand;
    let mySets = myHand.groupBy(card => card.get('set')).keySeq();
    let myCards = myHand.map(card => card.get('card')).toJS();

    let askableCards = this.props.cardsInPlay
      .filter(card => myCards.indexOf(card.get('card')) === -1)
      .filter(card => mySets.includes(card.get('set')))
      .sortBy(card => card.get('id'))
      .map(card => <option key={card.get('card')} value={card.get('card')}>{card.get('card')}</option>);

    return (
      <div>
        <AskMenu opponents={opponents} askableCards={askableCards} />
        <Button onClick={this.onCancel} text={"Cancel"} />
      </div>
    );
  }
}
