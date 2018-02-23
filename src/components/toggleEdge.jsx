import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable} from '@shopify/draggable';
import './toogleEdge.css';

class ToogleEdge extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const containers = document.querySelectorAll('.toggleEdge--container');
    if (containers.length === 0) {
      return false;
    }

    const draggable = new Draggable(containers, {
      draggable: '.toggleEdge--button',
      delay: 0,
    });

    draggable.on('drag:start', (evt) => {
      console.log('drag:start', evt);
    });

    draggable.on('drag:stop', (evt) => {
      console.log('drag:stop', evt);
    });
  }

  render() {
    return (
      <div className="toggleEdge--container">
        <div className="toggleEdge--button" >{this.props.value}</div>
      </div>
    );
  };

}

export default ToogleEdge;
