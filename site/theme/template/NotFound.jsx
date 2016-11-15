import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class NotFound extends Component{
  render(){
    const { children } = this.props;
    return(<div id="page-404">
      <section>
        <h1>404</h1>
        <p>你要找的页面不存在</p>
      </section>
     </div>)
  }
}