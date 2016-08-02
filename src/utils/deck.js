import { padStart, shuffle } from 'lodash';
import Immutable from 'seamless-immutable';

const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

function literatureDeck() {
  const deck = [];

  suits.forEach(suit => {
    for (let rank = 3; rank < 15; rank++) {
      const paddedRank = padStart(rank, 2, '0');

      const card = {
        rank,
        suit,
        id: `${suit}_${paddedRank}`,
        setName: `${rank > 8 ? 'major' : 'minor'} ${suit}`,
      };

      deck.push(card);
    }
  });

  return Immutable.from(shuffle(deck));
}

export default literatureDeck;
