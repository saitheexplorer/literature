import React from 'react';

const PlayerHand = ({ hand, player }) => {
  if (player !== '1') return <p>Player {player} - {hand.size} cards remaining.</p>;

  const cards = hand
    .sortBy(card => card.get('id'))
    .map(card => <li key={card.get('id')}>{card.get('id')}</li>);

  return (
    <div>
      <p>Player {player} Cards:</p>
      <ul>{cards}</ul>
    </div>
  );
}

export default PlayerHand;
