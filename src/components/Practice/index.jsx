import React from 'react';
import Terminal from '../Terminal';
import Map from '../Map';

import './Practice.scss';

const Practice = ({handleNewCommand, mapData, currentExplanation, directoryStructure}) => {
  return (
    <main>
      <Terminal handleNewCommand={handleNewCommand}/>
      <Map
        mapData={mapData}
        currentExplanation={currentExplanation}
        directoryStructure={directoryStructure}
      />
    </main>
  );
}

export default Practice;
