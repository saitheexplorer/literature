import React from 'react';

import Button from 'components/Button';

const MainMenu = ({ onAsk, onDeclare }) => (
  <div>
    <Button onClick={onAsk} text={'Ask'} />
    <Button onClick={onDeclare} text={'Declare'} />
  </div>
);

MainMenu.propTypes = {
  onAsk: React.PropTypes.func.isRequired,
  onDeclare: React.PropTypes.func.isRequired,
};

export default MainMenu;
