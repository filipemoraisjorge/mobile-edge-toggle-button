import React, { Component } from 'react';
import './AppGrid.css';
import ToggleEdge from '../../components/toggleEdge'

import GridGenerator, { baseColorsGradients } from '../../components/grid/gridGenerator';


class AppGrid extends Component {

  RED_MIN = 0;
  RED_MAX = 235;
  GREEN_MIN = 0;
  GREEN_MAX = 235;
  BLUE_MIN = 30;
  BLUE_MAX = 255;

  state = baseColorsGradients
    .map(color => ({ [color.name]: false }))
    .reduce((prev, curr) => ({ ...curr, ...prev }));

  toggleStatus = ({ id, value }) => {
    this.setState({ [id]: value });
  }

  statusLegend = () => {
    return this.state.status ? "ON" : "OFF";
  }

  renderToggles() {
    return baseColorsGradients.map(color => (
      <ToggleEdge
        key={color.name}
        id={color.name}
        options={{ textRight: color.name, textLeft: color.name }}
        onChange={this.toggleStatus} />
    ))
  }

  render() {
    const { status, red, green, blue } = this.state;
    return (
      <div className="app">
        <div className="app-foreground">
          {this.renderToggles()}
        </div>
        <div className="app-background">
          <GridGenerator filters={this.state}/>
        </div>
      </div>
    );
  }
}

export default AppGrid;