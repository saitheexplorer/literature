import React from 'react';

import Card from 'components/Card';

const PlayerHand = ({ hand, player }) => {
  if (player !== '1') return <p>Player {player} - {hand.size} cards remaining.</p>;

  const cards = hand
    .sortBy(card => card.get('id'))
    .map(card => card.get('id'))
    .map(id => <Card id={id} key={id}/>);

  return (
    <div>
      <p>Player {player} Cards:</p>
      {cards}
    </div>
  );
}

export default PlayerHand;
