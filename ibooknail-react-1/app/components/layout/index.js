import React from 'react';
import Home from '../home';
import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children || <Home />}
        <Footer/>
      </div>
    );
  };
};

module.exports = Layout;
