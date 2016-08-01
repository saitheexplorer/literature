import React from 'react';
import { connect } from 'react-redux';
import { compose, groupBy, get, sortBy, values } from 'lodash/fp';

import { startGame } from 'actions/game';

import StartGameButton from 'components/StartGameButton';
import PlayerHand from 'components/PlayerHand';

const getHandsFromDeck = compose(
  sortBy(get('id')),
  values,
  groupBy(get('owner'))
);

const Table = ({ gameStarted, startGameAction, deck }) => {
  if (!gameStarted) return <StartGameButton startGame={startGameAction} />;

  const hands = getHandsFromDeck(deck);

  return <div>{hands.map((x, i) => <PlayerHand key={i} cards={x} />)}</div>;
};

const mapStateToProps = ({ game, deck }) => ({
  gameStarted: game.gameStarted,
  deck,
});

const mapDispatchToProps = dispatch => ({
  startGameAction: () => dispatch(startGame(6)),
});

Table.propTypes = {
  gameStarted: React.PropTypes.bool.isRequired,
  startGameAction: React.PropTypes.func.isRequired,
  deck: React.PropTypes.array.isRequired,
};

Table.defaultProps = {
  gameStarted: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
