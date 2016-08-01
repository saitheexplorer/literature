import React from 'react';
import { connect } from 'react-redux';

const Score = ({ scoreA, scoreB }) => (
  <div>
    <p>Team A: {scoreA}</p>
    <p>Team B: {scoreB}</p>
  </div>
);

const mapStateToProps = ({ game }) => ({ scoreA: game.score.A, scoreB: game.score.B });

Score.propTypes = {
  scoreA: React.PropTypes.number.isRequired,
  scoreB: React.PropTypes.number.isRequired,
};

Score.defaultProps = {
  scoreA: 0,
  scoreB: 0,
};

export default connect(
  mapStateToProps
)(Score);
