import React from 'react';
import { connect } from 'react-redux';

import MainMenu from 'components/MainMenu';

import {
  startDeclaringSet,
  startAsking,
  cancelAskOrDeclare,
  takeCpuTurn,
} from 'actions/turn';

const Menu = (props) => {
  if (!props.gameStarted) return false;

  return <MainMenu {...props} />;
};

Menu.propTypes = {
  isAsking: React.PropTypes.bool.isRequired,
  isDeclaring: React.PropTypes.bool.isRequired,
  gameStarted: React.PropTypes.bool.isRequired,

  currentPlayer: React.PropTypes.string.isRequired,

  onDeclare: React.PropTypes.func.isRequired,
  onAsk: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  takeCpuTurn: React.PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isAsking: false,
  isDeclaring: false,
  gameStarted: false,
};

const mapStateToProps = ({ player, game, deck }) => ({
  deck,
  gameStarted: game.gameStarted,
  isAsking: player.isAsking,
  isDeclaring: player.isDeclaring,
  currentPlayer: player.currentPlayer,
});

const mapDispatchToProps = dispatch => ({
  onDeclare: () => dispatch(startDeclaringSet()),
  onAsk: () => dispatch(startAsking()),
  cancel: () => dispatch(cancelAskOrDeclare()),
  takeCpuTurn: () => dispatch(takeCpuTurn()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
