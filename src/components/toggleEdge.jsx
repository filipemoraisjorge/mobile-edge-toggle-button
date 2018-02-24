import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from '@shopify/draggable';

import './toogleEdge.css';


function translateMirror(mirror, mirrorCoords, containerRect) {
  if ( mirrorCoords.left < containerRect.left || mirrorCoords.right > containerRect.right ) {
    return;
  }

  requestAnimationFrame(() => {
    mirror.style.transform = `translate3d(${mirrorCoords.left}px, ${mirrorCoords.top}px, 0)`;
  });
}

function calcOffset(offset) {
  return offset * 2 * 0.5;
}

class ToogleEdge extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
  };
  
  toggleClass = 'toggleEdge--container-isOn';
  onClass = 'toggleEdge--button-isOn';
  offClass = 'toggleEdge--button-isOff';
  isToggled = false;
  initialMousePosition;
  containerRect;
  dragRect;
  dragThreshold;
  headings;
  headingText;


  componentDidMount() {
    const containerSelector = '.toggleEdge--container';
    const containers = document.querySelectorAll(containerSelector);
    if (containers.length === 0) {
      return false;
    }

    const draggable = new Draggable(containers, {
      draggable: '.toggleEdge--button',
      delay: 0,
      mirror: { constrainDimensions: true, xAxis: true, yAxis: false },
      appendTo: containerSelector,
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
  
      const containerRectQuarter = this.containerRect.width / 2;
      this.dragThreshold = this.isToggled ? containerRectQuarter * -1 : containerRectQuarter;
      this.headings = {
        source: evt.originalSource,
        mirror: evt.mirror,
      };
      this.headingText = {
        on: this.headings.source.dataset.switchOn,
        off: this.headings.source.dataset.switchOff,
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
        evt.originalSource.classList.remove(this.onClass);
        evt.originalSource.classList.add(this.offClass);
        
        this.headings.source.textContent = this.headingText.off;
        this.headings.mirror.textContent = this.headingText.off;
        this.isToggled = false;
        this.props.onChange(this.isToggled);      

      } else if (!this.isToggled && offsetValue > this.dragThreshold) {
        evt.sourceContainer.classList.add(this.toggleClass);
        evt.originalSource.classList.add(this.onClass);
        evt.originalSource.classList.remove(this.offClass);
        
        this.headings.source.textContent = this.headingText.on;
        this.headings.mirror.textContent = this.headingText.on;
        this.isToggled = true;
        this.props.onChange(this.isToggled);              
      }
    });
  };

  render() {
    return (
      <div>
        <div className="toggleEdge--container">
          <div className="toggleEdge--button toggleEdge--button-isOff" data-switch-off="off" data-switch-on="on">off</div>
        </div>
      </div>
    );
  };

}

export default ToogleEdge;
