import React from 'react';

import AskMenu from 'components/AskMenu';
import DeclareMenu from 'components/DeclareMenu';
import CpuTurnButton from 'components/CpuTurnButton';

const MainMenu = props => {
  if (props.isAsking) return <AskMenu cancel={props.cancel} deck={props.deck} />;
  if (props.isDeclaring) return <DeclareMenu cancel={props.cancel} />;

  if (props.currentPlayer !== '1') return <CpuTurnButton takeCpuTurn={props.takeCpuTurn} />;

  return (
    <div>
      <button className="button" onClick={props.onAsk}>Ask</button>
      <button className="button" onClick={props.onDeclare}>Declare</button>
    </div>
  );
};

MainMenu.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,

  isAsking: React.PropTypes.bool.isRequired,
  isDeclaring: React.PropTypes.bool.isRequired,

  deck: React.PropTypes.array.isRequired,

  onAsk: React.PropTypes.func.isRequired,
  onDeclare: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  takeCpuTurn: React.PropTypes.func.isRequired,
};

export default MainMenu;
