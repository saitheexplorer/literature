import React from 'react';

export default (props) => {
  let messages = props.messages.map((msg, idx) => <li key={idx}>{msg}</li>);

  return (
    <div>
      <h1>Events</h1>
      <ul>{messages}</ul>
    </div>
  );
}
