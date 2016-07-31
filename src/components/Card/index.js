import React from 'react';

const Card = ({ id }) => {
  const imageUrl = `/img/${id}.svg`;

  return <img src={imageUrl} height='100' />;
}

export default Card;
