import React, { Component } from 'react'

export default class PathCurveSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x1: Math.random()*300,
      dx1: Math.random()*2 - 1,
      y1: Math.random()*300,
      dy1: Math.random()*2 - 1,
      x2: Math.random()*300,
      dx2: Math.random()*2 - 1,
      y2: Math.random()*300,
      dy2: Math.random()*2 - 1,
      cx1: Math.random()*300,
      cdx1: Math.random()*2 - 1,
      cy1: Math.random()*300,
      cdy1: Math.random()*2 - 1,
      cx2: Math.random()*300,
      cdx2: Math.random()*2 - 1,
      cy2: Math.random()*300,
      cdy2: Math.random()*2 - 1,
    }
  }

  componentDidMount() {
    requestAnimationFrame(this.generateRandomPos)
  }

  generateRandomPos = () => {
    requestAnimationFrame(this.generateRandomPos)
    this.setState((prevState) => {
      let {x1, y1, x2, y2, dx1, dy1, dx2, dy2, cx1, cy1, cx2, cy2, cdx1, cdy1, cdx2, cdy2} = prevState;
      if (x1 >= window.innerWidth || x1 <= 0) {
        dx1 = -dx1;
        cdx1 = -cdx1;
      }
      if (y1 >= window.innerHeight || y1 <= 0) {
        dy1 = -dy1;
        cdy1 = -cdy1;
      }
      if (x2 >= window.innerWidth || x2 <= 0) {
        dx2 = -dx2;
        cdx2 = -cdx2;
      }
      if (y2 >= window.innerHeight || y2 <= 0) {
        dy2 = -dy2;
        cdy2 = -cdy2;
      }
      if (cx1 >= window.innerWidth || cx1 <= 0) {
        cdx1 = -cdx1;
      }
      if (cy1 >= window.innerHeight || cy1 <= 0) {
        cdy1 = -cdy1;
      }
      if (cx2 >= window.innerWidth || cx2 <= 0) {
        cdx2 = -cdx2;
      }
      if (cy2 >= window.innerHeight || cy2 <= 0) {
        cdy2 = -cdy2;
      }
      x1 += dx1;
      x2 += dx2;
      y1 += dy1;
      y2 += dy2;
      cx1 += cdx1;
      cx2 += cdx2;
      cy1 += cdy1;
      cy2 += cdy2;
      return {
        cx1, cy1, cx2, cy2, cdx1, cdy1, cdx2, cdy2, x1, y1, x2, y2, dx1, dy1, dx2, dy2
      }
    })
  }

  render() {
    const {x1, y1, x2, y2, cx1, cy1, cx2, cy2} = this.state;
    return (
        <path  d={`M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`} fill="transparent" stroke="#fff" strokeWidth="3" />
    )
  }
}
