import React from 'react';

import { takeCpuTurn } from '../../actions/cpu';
import Store from '../../stores';

export default class CpuPlayButton extends React.Component {
  onClick() {
    Store.dispatch(takeCpuTurn());
  }

  render() {
    return <button onClick={this.onClick}>Take CPU Turn</button>;
  }
}
