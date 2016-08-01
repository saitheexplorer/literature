import React from 'react';
import { connect } from 'react-redux';

import MainMenu from 'components/MainMenu';
import AskMenu from 'components/AskMenu';
import DeclareMenu from 'components/DeclareMenu';

import { startDeclaringSet, startAsking, cancelAskOrDeclare } from 'actions/turn';

const Menu = ({ isAsking, isDeclaring, onAsk, onDeclare, cancel, gameStarted }) => {
  if (!gameStarted) return false;

  if (!isAsking && !isDeclaring) return <MainMenu onDeclare={onDeclare} onAsk={onAsk} />;

  if (isAsking) return <AskMenu cancel={cancel} />;
  if (isDeclaring) return <DeclareMenu cancel={cancel} />;

  return false;
};

Menu.propTypes = {
  isAsking: React.PropTypes.bool.isRequired,
  isDeclaring: React.PropTypes.bool.isRequired,
  gameStarted: React.PropTypes.bool.isRequired,
  onDeclare: React.PropTypes.func.isRequired,
  onAsk: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isAsking: false,
  isDeclaring: false,
  gameStarted: false,
};

const mapStateToProps = ({ player, game }) => ({
  gameStarted: game.gameStarted,
  isAsking: player.isAsking,
  isDeclaring: player.isDeclaring,
});

const mapDispatchToProps = dispatch => ({
  onDeclare: () => dispatch(startDeclaringSet()),
  onAsk: () => dispatch(startAsking()),
  cancel: () => dispatch(cancelAskOrDeclare()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
