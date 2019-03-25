import React from 'react';

const Messages = ({ messages }) => {
  const messageListItems = messages.map((msg, idx) => <li key={idx}>{msg}</li>);

  return (
    <div>
      <h1>Events</h1>
      <ul>{messageListItems}</ul>
    </div>
  );
};

export default Messages;
