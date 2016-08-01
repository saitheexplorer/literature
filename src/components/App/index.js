import React from 'react';

import Table from 'containers/Table';
import Menu from 'containers/Menu';
import Score from 'containers/Score';

import './style.css';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="small-12 columns table-container">
        <Table />
      </div>
    </div>
    <div className="row">
      <div className="small-6 columns score-container">
        <Score />
      </div>
      <div className="small-6 columns menu-container">
        <Menu />
      </div>
    </div>
  </div>
);

export default App;
