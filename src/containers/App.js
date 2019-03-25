import { connect } from 'react-redux';

import { startGame } from '../actions/game';
import App from '../components/App';

const mapStateToProps = state => ({
  gameStarted: state.gameStarted,
  gameEnded: state.gameEnded,
  cardsInPlay: state.cardsInPlay,
  score: state.score,
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame(6)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
