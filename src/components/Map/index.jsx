import React from 'react';
import './Map.scss';
import Visualization from '../Visualization';

const Map = ({currentExplanation, mapData, currentPath}) => {

  const displayMapData = () => {
    return mapData.map((item, index) => {

      const current = item.current;

      return (
        <Visualization
          key={index}
          title={item.title}
          type={item.type}
          levelFromRoot={item.levelFromRoot}
          currentDir={current}
        />
      );
    });
  }

  return (
    <section className="map-container">
      <div className="visualizations">
        {displayMapData()}
      </div>
    </section>
  );
}

// <p>{currentExplanation}</p>
export default Map;
