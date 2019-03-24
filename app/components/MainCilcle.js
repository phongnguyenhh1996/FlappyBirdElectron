import React, { Component } from 'react'

export default class MainCilcle extends Component {
  render() {
    return (
      <circle cx={this.props.x} cy={this.props.y}  r="40" stroke="black" strokeWidth="3" fill="#fff" />
    )
  }
}
