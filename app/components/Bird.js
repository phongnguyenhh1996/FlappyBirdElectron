import React, { Component } from 'react'

export default class Bird extends Component {
  render() {
    return (
      <rect x={this.props.x} y={this.props.y} width="40" height="40" fill="#F7B52A" strokeWidth="3" stroke="#000"/>
    )
  }
}
