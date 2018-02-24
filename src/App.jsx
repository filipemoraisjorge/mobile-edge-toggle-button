import React, { Component } from 'react';
import './App.css';
import ToggleEdge from './components/toggleEdge'

class App extends Component {

  state = {
    status: false,
  }

  toggleStatus = (status) => {
    this.setState({ status });
  }

  statusLegend = () => {
    return this.state.status ? "ON" : "OFF";
  }

  render() {
    return (
      <div className="app">
        <div className="app-foreground">
          <ToggleEdge value={this.statusLegend()} onChange={this.toggleStatus} />
        </div>
        <div className="app-background">
          <div className="app-background--status" >
            {this.statusLegend()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;