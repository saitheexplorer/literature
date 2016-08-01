import React from 'react';

const Card = ({ id }) => <li>{id}</li>;

Card.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default Card;
