import React from 'react';

class Main extends React.Component {
	constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <main>
      	{this.props.children}
      </main>
    );
  };
};

export default Main;