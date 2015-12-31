import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu column">
        <h1>Menu</h1>
        {this.props.children}
      </div>
    );
  }
}
