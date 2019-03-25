import React from 'react';

const Card = ({ id, hidden }) => {
  const imagePath = hidden ? 'hidden' : id;

  return <img src={`/img/${imagePath}.svg`} height="100" alt={id} />;
};

export default Card;
