import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { startGame } from 'actions/game';
import { takeCpuTurn } from 'actions/cpu';

import Store from 'stores';
import App from 'components/App';

console.clear();

Store.dispatch(startGame(6));

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
