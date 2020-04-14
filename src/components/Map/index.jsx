import React from 'react';
import './Map.scss';
import Visualization from '../FileViz';

const Map = ({currentExplanation, directoryStructure}) => {

  const flattened = [];
  const flattenMe = (obj) => {

    Object.entries(obj).forEach(item => {
      const type = item[1] === null ? "file" : "dir";
      flattened.push({title: item[0], type});

      if (item[1] !== null) {
        flattenMe(item[1]);
      }
    });
    return renderItems(flattened);
  }

  const renderItems = (flattened) => {
    return flattened.map(item => {
      return (
        <Visualization
          title={item.title}
          type={item.type} />
      );
    });
  }

  return (
    <section>
      <p>{currentExplanation}</p>
      <Visualization title="root" type="dir" />
      {flattenMe(directoryStructure)}
    </section>
  );
}

export default Map;
