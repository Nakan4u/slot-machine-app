import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    inProgress: false,
    prize: 0,
    result: [],
  }

  config = {
    wheels: 3,
    scores: [1, 2, 3, 4],
    prizes: [10, 20, 100],
  }

  componentDidMount() {
    this.generateScores();
  }

  render() {
    const { result } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Slot machine app</h1>
        </header>
        <section>
          <Wheel value={result[0]}/>
          <Wheel value={result[1]}/>
          <Wheel value={result[2]}/>
          <button>Stop</button>
          <button onClick={() => this.onStartGame()}>Start</button>
          <p>Prize: {this.state.prize}</p>
        </section>
      </div>
    );
  }

  async onStartGame() {
    this.resetGame();
    await this.generateScores();
    const prize = this.calculatePrize();

    this.setState({
      prize
    })
  }

  resetGame() {
    this.setState({
      prize: 0,
      scores: []
    })
  }

  generateScores() {
    const { wheels, scores } = this.config;
    const result = [];

    for (let i = 0; i < wheels; i++) {
      result.push(this._getRandomInt(scores.length))
    }

    this.setState({
      result
    })
  }

  calculatePrize() {
    const { result } = this.state;

    if (result.every(item => item === result[0])) { // All same symbols
      return this.config.prizes[2];
    } else if (result[0] === result[1] || result[1] === result[2]) { // Two consecutive symbols
      return this.config.prizes[1];
    } else if (result[0] === result[2]) { // Two identical non-consecutive symbols
      return this.config.prizes[0];
    } else {
      return 0;
    }
  }

  _getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

function Wheel(props) {
  return (
    <div>
      Wheel {props.value || 0}
    </div>
  )
}

export default App;
