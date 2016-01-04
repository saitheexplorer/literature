import React from 'react';

export default class Messages extends React.Component {
  render() {
    let messages = this.props.messages.map((msg, idx) => <li key={idx}>{msg}</li>);

    return (
      <div>
        <h1>Events</h1>
        <ul>{messages}</ul>
      </div>
    );
  }
}
