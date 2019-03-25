import { connect } from 'react-redux';

import GameInfo from '../components/GameInfo';

const mapStateToProps = state => ({
  score: state.score,
  gameStarted: state.gameStarted,
  currentTurn: state.currentTurn,
  cardsInPlay: state.cardsInPlay,
  setsDiscarded: state.setsDiscarded,
});

export default connect(mapStateToProps)(GameInfo);
