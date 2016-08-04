import React from 'react';

import {
  compose,
  filter,
  get,
  map,
  includes,
  sortBy,
  uniq,
} from 'lodash/fp';

import CancelButton from 'components/CancelButton';

const getSetsFromHand = compose(uniq, map(get('setName')));
const getAskableCardsFromDeck = sets => compose(
  sortBy(get('id')),
  filter(x => includes(x.setName, sets)),
  filter(x => x.owner !== '1')
);

const AskMenu = ({ onCancel, deck, onAskSubmit, onChangeAskedCard, onChangeAskedPlayer }) => {
  const hand = deck.filter(x => x.owner === '1');
  const sets = getSetsFromHand(hand);

  const askableCardsFromDeck = getAskableCardsFromDeck(sets)(deck);

  return (
    <div>
      <select onChange={e => onChangeAskedPlayer(e.target.value)}>
        <option>Select a player...</option>
        <option value={'2'}>Player 2</option>
        <option value={'4'}>Player 4</option>
        <option value={'6'}>Player 6</option>
      </select>
      <select onChange={e => onChangeAskedCard(e.target.value)}>
        <option>Select a card...</option>
        {askableCardsFromDeck.map(x => <option key={x.id} v>{x.id}</option>)}
      </select>
      <p>
        <button className="button" onClick={onAskSubmit}>
          Ask
        </button>
      </p>
      <p>
        <CancelButton cancel={onCancel} />
      </p>
    </div>
  );
};

AskMenu.propTypes = {
  deck: React.PropTypes.array.isRequired,

  onCancel: React.PropTypes.func.isRequired,
  onChangeAskedPlayer: React.PropTypes.func.isRequired,
  onChangeAskedCard: React.PropTypes.func.isRequired,
  onAskSubmit: React.PropTypes.func.isRequired,
};

export default AskMenu;
