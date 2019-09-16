import React from 'react';
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
    // this.generateScores();
  }

  render() {
    const { result } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Slot machine app</h1>
        </header>
        <section>
          <div className="wheelsWrapper">
            <Wheel value={result[0]}/>
            <Wheel value={result[1]}/>
            <Wheel value={result[2]}/>
          </div>
          <button>Stop</button>
          <button onClick={() => this.onStartGame()}>Start</button>
          {this.state.result.length > 0 && 
            <div>
              <h2>{this.state.prize ? 'Congratulate!' : 'Try again!'}</h2>
              <h3>Prize: {this.state.prize}</h3>
            </div>
          }
        </section>
      </div>
    );
  }

  async onStartGame() {
    this.resetGame();
    await this.generateScores();

    this.setState({
      prize: this.calculatePrize()
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
    <div className="wheel">
      {props.value || 0}
    </div>
  )
}

export default App;
