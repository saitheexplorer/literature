import { shuffle } from 'lodash';
import Immutable, { List, Map, Range, Set } from 'immutable';
import pad from 'underscore.string/pad'

export const Suits = List(['diamonds', 'clubs', 'hearts', 'spades']);
export const Ranks = Range(3, 15);
export const Sets = Suits.reduce((memo, suit) => memo.concat(['minor', 'major'].map(set => `${set} ${suit}`)), List());

function LiteratureDeck() {
  var Deck = [];

  Suits.forEach(suit => {
    Ranks.forEach(rank => {
      Deck.push(Map({
        suit,
        rank: pad(rank, 2, '0'),
        card: suit + rank,
        set: `${rank < 9 ? 'minor' : 'major'} ${suit}`
      }));
    });
  });

  return shuffle(Deck);
}

export default LiteratureDeck();
