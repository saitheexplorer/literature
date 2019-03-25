import React from 'react';

import ErrorBanner from '../../containers/ErrorBanner';
import GameInfo from '../../containers/GameInfo';
import Menu from '../../containers/Menu';
import Messages from '../../containers/Messages';

import StartGameButton from '../../components/StartGameButton';
import PlayerHand from '../../components/PlayerHand';
import GameOver from '../../components/GameOver';

import './style.css';

const App = props => {
  if (!props.gameStarted)
    return <StartGameButton startGame={props.startGame} />;
  if (props.gameEnded)
    return <GameOver score={props.score} messages={props.messages} />;

  const hands = props.cardsInPlay.groupBy(card => card.get('owner'));

  return (
    <div className="container">
      <ErrorBanner />

      <div className="main column">
        {hands
          .sortBy((hand, player) => player)
          .entrySeq()
          .map(entry => (
            <PlayerHand key={entry[0]} player={entry[0]} hand={entry[1]} />
          ))}
      </div>

      <GameInfo />
      <Menu />
      <Messages />
    </div>
  );
};

export default App;
