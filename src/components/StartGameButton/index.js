import React from 'react';

import Store from 'stores';
import { bungleSet, startGame, declareSet } from 'actions';


class StartGameButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    Store.dispatch(startGame(6));

    // let currentTurn = Store.getState().currentTurn;

    // console.log(Store.getState());

    // let unsubscribe = Store.subscribe(() => console.log(Store.getState()));

    // Store.dispatch(bungleSet(currentTurn, 'Dm'));

    // currentTurn = Store.getState().currentTurn;

    // Store.dispatch(declareSet(currentTurn, 'DM'));

    // unsubscribe();
  }

  render() {
    if (!this.props.gameStarted) return <button onClick={this.onClick}>Start</button>;
    else return false;
  }
}

export default StartGameButton;

