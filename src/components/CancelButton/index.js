import React from 'react';

const CancelButton = ({ cancel }) => (
  <button
    className="button hollow alert"
    onClick={cancel}
  >
    Cancel
  </button>
);

CancelButton.propTypes = {
  cancel: React.PropTypes.func.isRequired,
};

export default CancelButton;
