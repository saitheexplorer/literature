import { shuffle } from 'lodash';
import { List, Map, Range } from 'immutable';
import { pad } from 'underscore.string';

import { cardFromId } from './card';

export const Suits = List(['diamonds', 'clubs', 'hearts', 'spades']);
export const Ranks = Range(3, 15);
export const Sets = Suits.reduce(
  (memo, suit) => memo.concat(['minor', 'major'].map(set => `${set} ${suit}`)),
  List()
);

function LiteratureDeck() {
  var Deck = [];

  Suits.forEach(suit => {
    Ranks.forEach(rank => {
      rank = pad(rank, 2, '0');

      Deck.push(Map(cardFromId(`${suit}_${rank}`)));
    });
  });

  return shuffle(Deck);
}

export default LiteratureDeck();
