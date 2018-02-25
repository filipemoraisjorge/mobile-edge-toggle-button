import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from '@shopify/draggable';

import './toggleEdge.css';


function translateMirror(mirror, mirrorCoords, containerRect) {
  if (mirrorCoords.left < containerRect.left || mirrorCoords.right > containerRect.right) {
    return;
  }

  requestAnimationFrame(() => {
    mirror.style.transform = `translate3d(${mirrorCoords.left}px, ${mirrorCoords.top}px, 0)`;
  });
}

function calcOffset(offset) {
  return offset * 2 * 0.5;
}

class ToggleEdge extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    valueRight: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    valueLeft: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    options: PropTypes.shape({
      textRight: PropTypes.string,
      textLeft: PropTypes.string,
    }),
  };

  static defaultProps = {
    valueRight: true,
    valueLeft: false,
    options: {
      textRight: 'on',
      textLeft: 'off',
    }
  }

  toggleClass = 'toggleEdge--container-isRight';
  rightStyleClass = 'toggleEdge--button-isRight';
  leftStyleClass = 'toggleEdge--button-isLeft';
  isToggled = false;
  initialMousePosition;
  containerRect;
  dragRect;
  dragThreshold;
  headings;
  headingText;


  componentDidMount() {
    const containerSelector = `#${this.props.id}`;
    const containers = document.querySelectorAll(containerSelector);
    if (containers.length === 0) {
      return false;
    }

    const draggable = new Draggable(containers, {
      draggable: '.toggleEdge--button',
      delay: 0,
      mirror: { constrainDimensions: false, xAxis: true, yAxis: false },

    });
  
    draggable.on('drag:start', (evt) => {
      evt.originalSource.style.opacity = 0;
      evt.source.style.opacity = 0;

      this.initialMousePosition = {
        x: evt.sensorEvent.clientX,
        y: evt.sensorEvent.clientY,
      };
    });

    draggable.on('drag:stop', (evt) => {
      evt.originalSource.style.opacity = 1;
      evt.source.style.opacity = 0;
    });

    draggable.on('mirror:created', (evt) => {
      this.containerRect = evt.sourceContainer.getBoundingClientRect();
      this.dragRect = evt.originalSource.getBoundingClientRect();

      const containerRectQuarter = this.containerRect.width / 4;
      this.dragThreshold = this.isToggled ? containerRectQuarter * -1 : containerRectQuarter;
      this.headings = {
        source: evt.originalSource,
        mirror: evt.mirror,
      };
      this.headingText = {
        right: this.props.options.textRight,
        left: this.props.options.textLeft,
      };
    });

    draggable.on('drag:move', (evt) => {
      evt.cancel();

      const offsetX = calcOffset(evt.sensorEvent.clientX - this.initialMousePosition.x);
      const offsetValue = offsetX;
      this.mirrorCoords = {
        top: this.dragRect.top,
        right: this.dragRect.right + offsetValue,
        left: this.dragRect.left + offsetValue,
      };

      translateMirror(evt.mirror, this.mirrorCoords, this.containerRect);

      if (this.isToggled && offsetValue < this.dragThreshold) {
        evt.sourceContainer.classList.remove(this.toggleClass);
        evt.originalSource.classList.remove(this.rightStyleClass);
        evt.originalSource.classList.add(this.leftStyleClass);

        this.headings.source.textContent = this.headingText.left;
        this.headings.mirror.textContent = this.headingText.left;
        this.isToggled = false;
        this.props.onChange({ id: this.props.id, value: this.props.valueLeft });

      } else if (!this.isToggled && offsetValue > this.dragThreshold) {
        evt.sourceContainer.classList.add(this.toggleClass);
        evt.originalSource.classList.add(this.rightStyleClass);
        evt.originalSource.classList.remove(this.leftStyleClass);

        this.headings.source.textContent = this.headingText.right;
        this.headings.mirror.textContent = this.headingText.right;
        this.isToggled = true;
        this.props.onChange({ id: this.props.id, value: this.props.valueRight });
      }
    });
  };

  render() {
    return (
      <div>
        <div id={this.props.id} className="toggleEdge--container">
          <div className="toggleEdge--button toggleEdge--button-isLeft">{this.props.options.textLeft}</div>
        </div>
      </div>
    );
  };

}

export default ToggleEdge;
