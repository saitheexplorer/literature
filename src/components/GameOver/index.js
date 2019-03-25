import React from 'react';

import Messages from '../../containers/Messages';

export default ({ score }) => (
  <div>
    <h1>Game Over!</h1>
    <p>Team A - {score.A}</p>
    <p>Team B - {score.B}</p>
    <Messages />
  </div>
);
