import React from 'react';
import { connect } from 'react-redux';

const Score = ({ scoreA, scoreB, gameStarted }) => {
  if (!gameStarted) return false;

  return (
    <div>
      <p>Team A: {scoreA}</p>
      <p>Team B: {scoreB}</p>
    </div>
  );
};

const mapStateToProps = ({ game }) => ({
  scoreA: game.score.A,
  scoreB: game.score.B,
  gameStarted: game.gameStarted,
});

Score.propTypes = {
  scoreA: React.PropTypes.number.isRequired,
  scoreB: React.PropTypes.number.isRequired,
  gameStarted: React.PropTypes.bool.isRequired,
};

Score.defaultProps = {
  scoreA: 0,
  scoreB: 0,
};

export default connect(
  mapStateToProps
)(Score);
