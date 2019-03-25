import { connect } from 'react-redux';

import Menu from '../components/Menu';

const mapStateToProps = state => {
  const myHand = state.cardsInPlay
    .groupBy(card => card.get('owner'))
    .get(state.currentPlayer);

  return {
    currentPlayer: state.currentPlayer,
    numberOfPlayers: state.numberOfPlayers,
    setsDiscarded: state.setsDiscarded,
    cardsInPlay: state.cardsInPlay,
    myHand,
  };
};

export default connect(mapStateToProps)(Menu);
