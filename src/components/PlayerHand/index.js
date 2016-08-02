import React from 'react';

import { get, sortBy } from 'lodash/fp';

import Card from 'components/Card';

const sortById = sortBy(get('id'));

const PlayerHand = ({ cards }) => {
  const owner = cards[0].owner; // hacky, should be passed in as prop

  if (owner !== '1') return <p>Player {owner} - {cards.length} cards</p>;

  const cardListItems = sortById(cards).map((c, i) => <Card key={i} id={c.id} />);

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
