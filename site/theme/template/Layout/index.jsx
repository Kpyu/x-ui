import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';
export default class Layout extends Component {

  render() {
    const { children } = this.props;
    return (
      <div className="page-wrapper">
        <Header />
        {children}
        <Footer/>
      </div>
    )
  }
}