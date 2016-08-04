import React from 'react';

import CancelButton from 'components/CancelButton';

const DeclareMenu = ({ onCancel }) => <CancelButton cancel={onCancel} />;

DeclareMenu.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
};

export default DeclareMenu;
