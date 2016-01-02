import { Map } from 'immutable';
import { titleize } from 'underscore.string';

const faceCards = {
  '11': 'Jack',
  '12': 'Queen',
  '13': 'King',
  '14': 'Ace'
};

export function cardFromId(id) {
  let split = id.split('_');

  let suit = split[0];
  let rank = parseInt(split[1]);

  let set = `${rank < 9 ? 'minor' : 'major'} ${suit}`;
  let properName = `${faceCards[String(rank)] || rank} of ${titleize(suit)}`

  return Map({suit, rank, card: id, set, id, properName});
}
