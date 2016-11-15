import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export default class Header extends Component {

  render() {
    const { children } = this.props;
    return (
      <header id="header" className="light">
        <div className="row">
          <div className="col logo">
            <a href="/">FDDUI 组件库</a>
          </div>
          <div className="col head-content">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="/">首页</a>
              </li>
              <li className="nav-item">
                <a href="/components/button">组件</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}