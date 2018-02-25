import React from 'react';
import './itemGrid.css';

const masonryUnitPixels = 160;
const masonryGutterPixels = 5;

const random = (min, max) => min + Math.round(Math.random() * (max - min));
const capitalize = word => word.substr(0, 1).toUpperCase() + word.substring(1);

const renderItems = items => items.map(item => (
  <div
    key={item.id}
    style={{
      gridRowEnd: `span ${item.format.y}`,
      gridColumnEnd: `span ${item.format.x}`,
    }}
    className="item"
  >
    <div className="item--header">
      <span className="item--header--title">
        <span className="item--header--title__name">{capitalize(item.color.name)}</span>
        <span className="item--header--title__description">A small description.</span>
      </span>

      <span className="item--header--price">
        <span className="item--header--price__int">
          {Math.floor(item.price)}
        </span>
        <span className="item--header--price__decimal">
          <span className="item--header--price__cents">
            {((item.price % 1)).toFixed(2).substr(2, 2)}
          </span>
          <span className="item--header--price__currency">€</span>
        </span>
      </span>
    </div>

    <div
      className="item--image"
      style={{
        background: `linear-gradient(${random(100, 160)}deg, ${item.color.in}, ${item.color.out})`,
        // color: 'transparent',
        // '-webkit-background-clip': 'text',
      }}
    >
      <i className={item.icon} />
    </div>
  </div >
));

export default props => (
  <div
    className="masonary"
    style={{
      gridAutoRows: `${masonryUnitPixels}px`,
      gridGap: `${masonryGutterPixels}px`,
      minWidth: `${((masonryUnitPixels * 2) + masonryGutterPixels)}px`,
      gridTemplateColumns: `repeat(auto-fill, minmax(${masonryUnitPixels}px, 1fr))`,

    }}
  >
    {renderItems(props.items)}
  </div>
);

