import React from 'react';

const CpuTurnButton = ({ takeCpuTurn }) => (
  <button className="button" onClick={takeCpuTurn}>
    CPU Turn
  </button>
);

CpuTurnButton.propTypes = {
  takeCpuTurn: React.PropTypes.func.isRequired,
};

export default CpuTurnButton;
