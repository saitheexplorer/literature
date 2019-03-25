import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
