import React from 'react';

export default class ErrorBanner extends React.Component {
  render() {
    return <p className="error-banner">{this.props.message}</p>;
  }
}
