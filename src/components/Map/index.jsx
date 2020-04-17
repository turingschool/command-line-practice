import React from 'react';
import './Map.scss';
import Visualization from '../Visualization';

const Map = ({currentExplanation, directoryStructure, mapData}) => {

  const displayMapData = () => {
    return mapData.map(item => {
      return (
        <Visualization
          title={item.title}
          type={item.type}
          levelFromRoot={item.levelFromRoot} />
      );
    });
  }

  return (
    <section className="map-container">
      <p>{currentExplanation}</p>
      <div class="visualizations">
        <Visualization title="root" type="dir" levelFromRoot="0" />
        {displayMapData()}
      </div>
    </section>
  );
}

export default Map;
