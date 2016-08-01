import { padStart, shuffle } from 'lodash';
import Immutable from 'seamless-immutable';

const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

function literatureDeck() {
  const deck = [];

  suits.forEach(suit => {
    for (let rank = 3; rank < 15; rank++) {
      const paddedRank = padStart(rank, 2, '0');

      deck.push({ rank, suit, id: `${paddedRank}_${suit}` });
    }
  });

  return Immutable.from(shuffle(deck));
}

export default literatureDeck;
