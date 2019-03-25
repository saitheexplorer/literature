import React from 'react';

import Card from '../../components/Card';

const PlayerHand = ({ hand, player }) => {
  const cards = hand.map(card => card.get('id'));

  if (player !== '1') return cards.map(id => <Card id={id} hidden={true} />);

  cards.sort().map(id => <Card id={id} key={id} />);

  return (
    <div>
      <p>Player {player} Cards:</p>
      {cards.sort().map(id => (
        <Card id={id} key={id} />
      ))}
    </div>
  );
};

export default PlayerHand;
