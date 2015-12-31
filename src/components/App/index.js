import React from 'react';
import { connect } from 'react-redux';

import StartGameButton from 'components/StartGameButton';
import DeclareSetButton from 'components/DeclareSetButton';
import AskPlayerButton from 'components/AskPlayerButton';
import ErrorBanner from 'components/ErrorBanner';
import PlayerHand from 'components/PlayerHand';
import Main from 'components/Main';
import GameInfo from 'components/GameInfo';
import Menu from 'components/Menu';

class App extends React.Component {
  render() {
    if (!this.props.gameStarted) return <StartGameButton gameStarted={this.props.gameStarted} />;

    let hands = this.props.cardsInPlay.groupBy(card => card.get('owner'));
    let myHand = hands.get('1');

    return (
      <div className="container">
        <ErrorBanner message={this.props.error.errorMessage} />

        <Main>
          {hands
            .sortBy((hand, player) => player)
            .entrySeq()
            .map((entry) => <PlayerHand key={entry[0]} player={entry[0]} hand={entry[1]} />)}
        </Main>

        <GameInfo
          score={this.props.score}
          gameStarted={this.props.gameStarted}
          currentTurn={this.props.currentTurn}
          cardsInPlay={this.props.cardsInPlay}
          setsDiscarded={this.props.setsDiscarded}
        />

        <Menu>
          <AskPlayerButton
            numberOfPlayers={this.props.numberOfPlayers}
            cardsInPlay={this.props.cardsInPlay}
            myHand={myHand}
          />
          {/*<DeclareSetButton
            discardedSets={this.props.setsDiscarded}
            currentTurn={this.props.currentTurn}
            numberOfPlayers={this.props.numberOfPlayers}
          />*/}
        </Menu>
      </div>
    );
  }
}

export default connect(select)(App);

function select(state) {
  return state;
}

