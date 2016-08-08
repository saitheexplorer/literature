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

class AskMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { askingCard: null, askingPlayer: null };

    this.changeAskingCard = this.changeAskingCard.bind(this);
    this.changeAskingPlayer = this.changeAskingPlayer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { askingCard, askingPlayer } = this.state;

    if (askingCard && askingPlayer) this.props.onAskSubmit('1', askingCard, askingPlayer);
  }

  changeAskingCard(event) {
    this.setState({ askingCard: event.target.value, askingPlayer: this.state.askingPlayer });
  }

  changeAskingPlayer(event) {
    this.setState({ askingPlayer: event.target.value, askingCard: this.state.askingCard });
  }

  render() {
    const { deck, onCancel } = this.props;

    const hand = deck.filter(x => x.owner === '1');
    const sets = getSetsFromHand(hand);

    const askableCardsFromDeck = getAskableCardsFromDeck(sets)(deck);

    return (
      <div>
        <select onChange={this.changeAskingPlayer}>
          <option>Select a player...</option>
          <option value={'2'}>Player 2</option>
          <option value={'4'}>Player 4</option>
          <option value={'6'}>Player 6</option>
        </select>
        <select onChange={this.changeAskingCard}>
          <option>Select a card...</option>
          {askableCardsFromDeck.map(x => <option key={x.id}>{x.id}</option>)}
        </select>
        <p>
          <button className="button" onClick={this.onSubmit}>
            Ask
          </button>
        </p>
        <p>
          <CancelButton cancel={onCancel} />
        </p>
      </div>
    );
  }
}

AskMenu.propTypes = {
  deck: React.PropTypes.array.isRequired,

  onCancel: React.PropTypes.func.isRequired,
  onAskSubmit: React.PropTypes.func.isRequired,
};

export default AskMenu;
