import React, { Component } from 'react'

export default class MovingRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x
    }
  }

  componentDidMount() {
  }

  movingX =() => {
    requestAnimationFrame(this.movingX);
    if (this.state.x <= -100) {
      this.props.removeRect(this.props.id);
    }
    this.setState((prevState) => {
      return {
        x: prevState.x - 4
      }
    })
  }

  render() {
    return (
      <rect x={this.props.x} y={this.props.y} width={this.props.width }height={this.props.height} strokeWidth="5" stroke="#000" fill="#62CB2A" />
    )
  }
}
