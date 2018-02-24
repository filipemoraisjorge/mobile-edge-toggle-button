import React, { Component } from 'react';
import './App.css';
import ToggleEdge from './components/toggleEdge'

class App extends Component {

  RED_MIN = 0;
  RED_MAX = 235;
  GREEN_MIN = 0;
  GREEN_MAX = 235;
  BLUE_MIN = 30;
  BLUE_MAX = 255;


  state = {
    status: false,
    red: this.RED_MIN,
    green: this.GREEN_MIN,
    blue: this.BLUE_MIN,
  }

  toggleStatus = ({ id, value }) => {
    console.log(id, value);
    this.setState({ [id]: value });
  }

  statusLegend = () => {
    return this.state.status ? "ON" : "OFF";
  }



  render() {
    const { status, red, green, blue } = this.state;
    console.log(`rgb(${red},${green},${blue})`,
      `rgb(${this.RED_MAX - red},${this.GREEN_MAX - green},${this.BLUE_MAX - blue})`
    );
    return (
      <div className="app">
        <div className="app-foreground">
          <ToggleEdge id="red"
            offValue={this.RED_MIN} onValue={this.RED_MAX}
            options={{ onText: 'r', offText: 'r' }}
            onChange={this.toggleStatus} />
          <ToggleEdge id="green"
            offValue={this.GREEN_MIN} onValue={this.GREEN_MAX}
            options={{ onText: 'g', offText: 'g' }}
            onChange={this.toggleStatus} />
          <ToggleEdge id="blue"
            offValue={this.BLUE_MIN} onValue={this.BLUE_MAX}
            options={{ onText: 'b', offText: 'b' }}
            onChange={this.toggleStatus} />

        </div>
        <div className="app-background"
          style={{
            backgroundColor: `rgb(${red},${green},${blue})`,
            color: `rgb(${this.RED_MAX - red},${this.GREEN_MAX - green},${this.BLUE_MAX - blue})`
          }}>
          <div className="app-background--status" >
            RGB
          </div>
        </div>
      </div>
    );
  }
}

export default App;