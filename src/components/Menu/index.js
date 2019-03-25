import React from 'react';

import CpuPlayButton from '../../components/CpuPlayButton';
import PlayerMenu from '../../components/PlayerMenu';

import './style.css';

const Menu = props => {
  let element = <CpuPlayButton />;

  if (props.currentPlayer === '1')
    element = (
      <PlayerMenu
        myHand={props.myHand}
        numberOfPlayers={props.numberOfPlayers}
        cardsInPlay={props.cardsInPlay}
        setsDiscarded={props.setsDiscarded}
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
};

export default Menu;
