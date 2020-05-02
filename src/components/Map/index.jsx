import React from 'react';
import './Map.scss';
import Visualization from '../Visualization';
import RecentCommandCard from '../RecentCommandCard';

const Map = ({currentCommand, mapData, currentPath}) => {

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
      <RecentCommandCard currentCommand={currentCommand}/>
      <div className="visualizations">
        {displayMapData()}
      </div>
    </section>
  );
}

export default Map;
