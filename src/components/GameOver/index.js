import React from 'react';

import Messages from 'components/Messages';

export default (props) => {
  return (
    <div>
      <h1>Game Over!</h1>
      {props.score.entrySeq().map(entry => <p key={entry[0]}>Team {entry[0]} - {entry[1]}</p>)}
      <Messages messages={props.messages} />
    </div>
  );
}
