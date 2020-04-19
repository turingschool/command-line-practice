import React from 'react';
import './Map.scss';
import Visualization from '../Visualization';

const Map = ({currentExplanation, directoryStructure, mapData}) => {

  const displayMapData = () => {
    return mapData.map((item, index) => {
      return (
        <Visualization
          key={index}
          title={item.title}
          type={item.type}
          levelFromRoot={item.levelFromRoot}
        />
      );
    });
  }

  return (
    <section className="map-container">
      <p>{currentExplanation}</p>
      <div className="visualizations">
        <Visualization title="root" type="dir" levelFromRoot="0" />
        {displayMapData()}
      </div>
    </section>
  );
}

export default Map;
