import React from 'react';

import CancelButton from 'components/CancelButton';

const DeclareMenu = ({ cancel }) => <CancelButton cancel={cancel} />;

DeclareMenu.propTypes = {
  cancel: React.PropTypes.func.isRequired,
};

export default DeclareMenu;
