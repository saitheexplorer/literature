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
  }

  render() {
    if (!this.props.gameStarted) return <button onClick={this.onClick}>Start</button>;
  }
}

export default StartGameButton;

