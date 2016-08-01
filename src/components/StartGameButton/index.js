import React from 'react';

import './style.css';

const StartGameButton = ({ startGame }) => (
  <div className="start-game-container">
    <button className="start-game-button large button" onClick={startGame}>
      Start Game!
    </button>
  </div>
);

StartGameButton.propTypes = {
  startGame: React.PropTypes.func.isRequired,
};

export default StartGameButton;
