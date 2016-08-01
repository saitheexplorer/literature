import React from 'react';

import Card from 'components/Card';

const PlayerHand = ({ cards }) => {
  const owner = cards[0].owner; // hacky

  if (owner !== '1') return <p>Player {owner} - {cards.length} cards</p>;

  const cardListItems = cards.map((c, i) => <Card key={i} id={c.id} />);

  return (
    <div>
      <p>Your cards:</p>
      <ul>{cardListItems}</ul>
    </div>
  );
};

PlayerHand.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

export default PlayerHand;
