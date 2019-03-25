import React from 'react';

import DeclareSetMenu from '../../components/DeclareSetMenu';

class DeclareSetButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDeclaring: false };
    this.startDeclaring = this.startDeclaring.bind(this);
  }

  startDeclaring() {
    this.setState({ isDeclaring: true });
  }

  render() {
    if (!this.state.isDeclaring)
      return <button onClick={this.startDeclaring}>Declare Set</button>;

    return (
      <DeclareSetMenu
        discardedSets={this.props.discardedSets}
        numberOfPlayers={this.props.numberOfPlayers}
        currentTurn={this.props.currentTurn}
      />
    );
  }
}

export default DeclareSetButton;
