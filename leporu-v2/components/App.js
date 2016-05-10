import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
      	<p>Header</p>
        <main>{this.props.children}</main>
        <p>Footer</p>
      </div>
    );
  }
}