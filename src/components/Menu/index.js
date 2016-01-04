import React from 'react';

import CpuPlayButton from 'components/CpuPlayButton';
import PlayerMenu from 'components/PlayerMenu';

import style from './style.css';


export default class Menu extends React.Component {
  render() {
    let element = <CpuPlayButton />;

    if (this.props.currentPlayer === '1') element = (
      <PlayerMenu
        myHand={this.props.myHand}
        numberOfPlayers={this.props.numberOfPlayers}
        cardsInPlay={this.props.cardsInPlay}
        setsDiscarded={this.props.setsDiscarded}
      />
    );

    return (
      <div className="menu column">
        <h1>Menu</h1>
          {element}
        <br />
        <br />
      </div>
    );

  }
}

