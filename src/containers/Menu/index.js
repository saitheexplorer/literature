import React from 'react';
import { connect } from 'react-redux';

import MainMenu from 'components/MainMenu';

import { takeCpuTurn } from 'actions/cpu';
import {
  startDeclaringSet,
  startAsking,
  cancelAskOrDeclare,
  changeAskedCard,
  changeAskedPlayer,
  askPlayerQuestion,
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
  onAskSubmit: React.PropTypes.func.isRequired,
  onCancelAskOrDeclare: React.PropTypes.func.isRequired,
  onChangeAskedCard: React.PropTypes.func.isRequired,
  onChangeAskedPlayer: React.PropTypes.func.isRequired,
  takeCpuTurn: React.PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isAsking: false,
  isDeclaring: false,
  gameStarted: false,
};

const mapStateToProps = ({ player, game, deck, question }) => ({
  deck,
  gameStarted: game.gameStarted,
  isAsking: player.isAsking,
  isDeclaring: player.isDeclaring,
  currentPlayer: player.currentPlayer,
  askedPlayer: question.askedPlayer,
  askedCard: question.askedCard,
});

const mapDispatchToProps = dispatch => ({
  onDeclare: () => dispatch(startDeclaringSet()),
  onAsk: () => dispatch(startAsking()),
  onCancelAskOrDeclare: () => dispatch(cancelAskOrDeclare()),
  takeCpuTurn: () => dispatch(takeCpuTurn()),
  onChangeAskedCard: card => dispatch(changeAskedCard(card)),
  onChangeAskedPlayer: player => dispatch(changeAskedPlayer(player)),
  onAskSubmit: () => dispatch(askPlayerQuestion()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
