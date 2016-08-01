import React from 'react';

import CancelButton from 'components/CancelButton';

const AskMenu = ({ cancel }) => <CancelButton cancel={cancel} />;

AskMenu.propTypes = {
  cancel: React.PropTypes.func.isRequired,
};

export default AskMenu;
