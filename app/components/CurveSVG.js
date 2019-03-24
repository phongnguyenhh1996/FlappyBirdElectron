import React, { Component } from 'react'
// import PathCurveSVG from "./PathCurveSVG";
// import MainCilcle from "./MainCilcle";
import MovingRect from "./MovingRect";
import Bird from "./Bird";

const HOLE_HEIGHT = 150;
const HOLE_RANGE = 400;
const TROLL_RECT = 30;

export default class CurveSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScore: false,
      countRect: 2,
      started: false,
      score: 0,
      lose: false,
      opacityFlash: 0.9,
      mouse: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      cicle: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      movingRect: [{
        x: window.innerWidth - 50,
        randomHeight: ((window.innerHeight - HOLE_HEIGHT - HOLE_RANGE) / 2) + Math.floor(Math.random()*(HOLE_RANGE+1))
      }],
      bird: {
        x: 150,
        y: window.innerHeight / 2,
        dy: 0.5,
        gravity: 0.5,
        jump: false,
        jumping: false,
        jumpTo: 0,
        getScore: false
      }
    }
  }

  componentDidMount() {
    requestAnimationFrame(this.handleMovingRect);
    // this.setState({
    //   requestAnimationFrame: requestAnimationFrame(this.setMousePos)
    // })
    addEventListener('keydown', (e) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !this.state.lose) {
        this.setState((prevState) => {
            return {
              started: !prevState.started && this.state.movingRect.length === 1 ? true : prevState.started,
              bird: {
                ...prevState.bird,
                jump: true,
                jumpTo: 7,
                gravity: 0.5
              }
            }
          })
      }
    })
  }

  resetGame = () => {
    this.setState({
      showScore: false,
      opacityFlash: 0.9,
      countRect: 2,
      started: false,
      score: 0,
      lose: false,
      movingRect: [{
        x: window.innerWidth - 50,
        randomHeight: ((window.innerHeight - HOLE_HEIGHT - HOLE_RANGE) / 2) + Math.floor(Math.random()*(HOLE_RANGE+1)),
        getScore: false
      }],
      bird: {
        x: 150,
        y: window.innerHeight / 2,
        dy: 0.5,
        gravity: 0.5,
        jump: false,
        jumping: false,
        jumpTo: 0
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.lose && this.state.lose) {
      this.setState({
        started: false
      });
      setTimeout(() => {
        this.setState({
         showScore: true
        })
      }, 500);
    }
  }

  handleMovingRect = () => {
    requestAnimationFrame(this.handleMovingRect);
    this.setState((prevState) => {
      let movingRect = [...prevState.movingRect];
      const bird = {...prevState.bird};
      let {score, lose, countRect, opacityFlash} = prevState;
      if (this.state.started) {
        if (bird.y >= window.innerHeight) {
          lose = true
        }
        if (!bird.jump) {
          bird.gravity = bird.gravity*1.04 + 0.4;
          bird.y += bird.gravity;
        } else {
          if (bird.jumpTo > 0) {
            bird.y -= bird.jumpTo*1.2;
            bird.jumpTo -= 0.5;
          } else {
            bird.jump = false
          }
        }
        movingRect = movingRect.map((item, i) => {
            if ((bird.x + 40 >= item.x || bird.x >= item.x) && (bird.x + 40 <= item.x + 100 || bird.x <= item.x + 100)) {
              if (bird.y <= item.randomHeight ||
                (bird.y + 40 >= item.randomHeight + HOLE_HEIGHT)) {
                  lose = true
                }
            }
            if (item.x + 50 <= bird.x && !item.getScore) {
              score += 1;
              return {
                ...item,
                x: item.x - 5,
                getScore: true
              }
            } else return {
              ...item,
              x: item.x - 5
            }
          }
         );
        if (movingRect[movingRect.length - 1] && movingRect[movingRect.length - 1].x <= window.innerWidth - 400) {
          countRect+=1;
          let randomHeight =  ((window.innerHeight - HOLE_HEIGHT - HOLE_RANGE) / 2) + Math.floor(Math.random()*(HOLE_RANGE+1));
          if (this.state.countRect === TROLL_RECT - 1) {
            randomHeight = window.innerHeight - HOLE_HEIGHT;
          }
          if (this.state.countRect === TROLL_RECT) {
            randomHeight = 0;
          }
          movingRect.push({
            x: window.innerWidth,
            randomHeight,
            getScore: false
          })
        } 
      }
      if (this.state.lose) {
        opacityFlash -= 0.1;
        bird.gravity = bird.gravity*1.04 + 0.4;
        bird.y += bird.gravity;
      }
      if (!this.state.started && !this.state.lose) {
        bird.y += bird.dy;
        if (bird.y >= window.innerHeight/2 + 10 || bird.y <= window.innerHeight/2 - 10) {
          bird.dy = -bird.dy;
        }
      }
      return {
        movingRect: movingRect.filter(item => item.x >= -100),
        bird,
        score,
        lose,
        countRect,
        opacityFlash
      }
    })
  }

  getMousePos = (e) => {
    this.setState({
      mouse: {
        x: e.clientX,
        y: e.clientY
      }
    });
  }

  setMousePos = () => {
    requestAnimationFrame(this.setMousePos);
    this.setState((prevState) => {
      const {cicle} = prevState;
      const {mouse} = this.state;
      if (mouse.x && mouse.x !== cicle.x) {
        cicle.x += (mouse.x - cicle.x) * 0.2
      }
      if (mouse.y && mouse.y !== cicle.y) {
        cicle.y += (mouse.y - cicle.y) * 0.2 
      }
      return {
        cicle
      }
    })
  }

  componentWillUnmount() {
    // cancelAnimationFrame(this.state.requestAnimationFrame);
  }

  render() {
    return (
      <svg width={window.innerWidth} height={window.innerHeight} onMouseMove={this.getMousePos}>
        { this.state.movingRect.map((item,index) => 
          <React.Fragment key={index}>
            <MovingRect
              x={item.x} y={0}
              width="100" height={item.randomHeight}
              key={index+"1"} id={item.id}/>
            <MovingRect
              x={item.x} y={item.randomHeight + HOLE_HEIGHT}
              width="100" height={window.innerHeight - (item.randomHeight + HOLE_HEIGHT)}
              key={index+"2"} id={item.id}/>
          </React.Fragment>
          )
        }
        <Bird x={this.state.bird.x} y={this.state.bird.y}/>
        { this.state.started && !this.state.lose &&
          <text x={window.innerWidth/2} textAnchor="middle" y="100" stroke="#000" strokeWidth="3" fill="#fff" fontWeight="bold" fontSize="40" >{this.state.score}</text>
        }
        
        {!this.state.started && !this.state.lose &&
          <text x="50%" textAnchor="middle" y="50%" fill="#fff" fontWeight="bold" fontSize="20" >Press Space or ArrowUp to start !</text>
        }
        {this.state.lose &&
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" opacity={this.state.opacityFlash}/>
        }
        {this.state.showScore &&
          <React.Fragment>
            <rect x={window.innerWidth / 2 - 200} y={window.innerHeight / 2 - 100} width="400px" height="200px" stroke="#000" strokeWidth="2" fill="#DED895"/>
            <text x={window.innerWidth/2} textAnchor="middle" y={window.innerHeight / 2 - 20} stroke="#000" strokeWidth="3" fill="#fff" fontWeight="bold" fontSize="40" >Score: {this.state.score}</text>
            <text onClick={this.resetGame} style={{cursor: 'pointer'}} x={window.innerWidth/2} textAnchor="middle" y={window.innerHeight / 2 + 40} stroke="#000" strokeWidth="3" fill="#ED6000" fontWeight="bold" fontSize="40" >Restart</text>
          </React.Fragment>
        }
        {/* <MainCilcle x={this.state.cicle.x} y={this.state.cicle.y}/> */}
      </svg>
    )
  }
}
