import { Map } from 'immutable';
import { titleize } from 'underscore.string';

const faceCards = {
  '11': 'Jack',
  '12': 'Queen',
  '13': 'King',
  '14': 'Ace',
};

export function cardFromId(id) {
  const [suit, rank] = id.split('_');

  const set = `${parseInt(rank, 10) < 9 ? 'minor' : 'major'} ${suit}`;
  const properName = `${faceCards[rank] || rank} of ${titleize(suit)}`;

  return Map({
    suit,
    rank,
    card: id,
    set,
    id,
    properName,
  });
}
