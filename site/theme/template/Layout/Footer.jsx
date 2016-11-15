import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export default class Footer extends Component {
  render() {
    const { children } = this.props;
    return (
      <footer id="footer">
        <div>页尾</div>
      </footer>
    )
  }
}