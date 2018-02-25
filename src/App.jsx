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
    this.setState({ [id]: value });
  }

  statusLegend = () => {
    return this.state.status ? "ON" : "OFF";
  }



  render() {
    const { status, red, green, blue } = this.state;
    return (
      <div className="app">
        <div className="app-foreground">
          <ToggleEdge id="red"
            valueLeft={this.RED_MIN} valueRight={this.RED_MAX}
            options={{ textRight: 'r', textLeft: 'r' }}
            onChange={this.toggleStatus} />
          <ToggleEdge id="green"
            valueLeft={this.GREEN_MIN} valueRight={this.GREEN_MAX}
            options={{ textRight: 'g', textLeft: 'g' }}
            onChange={this.toggleStatus} />
          <ToggleEdge id="blue"
            valueLeft={this.BLUE_MIN} valueRight={this.BLUE_MAX}
            options={{ textRight: 'b', textLeft: 'b' }}
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