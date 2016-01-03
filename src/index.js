import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Range } from 'immutable';

import { startGame, passTurnToNextTeammate, changeTurn } from 'actions/game';
import { takeCpuTurn } from 'actions/cpu';

import Store from 'stores';
import App from 'components/App';

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
