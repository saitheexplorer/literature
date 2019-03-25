import { connect } from 'react-redux';

import ErrorBanner from '../components/ErrorBanner';

const mapStateToProps = state => ({
  message: state.error.errorMessage,
});

export default connect(mapStateToProps)(ErrorBanner);
