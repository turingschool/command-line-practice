import React from 'react';
import Terminal from '../Terminal';
import Map from '../Map';

import './Practice.scss';

const Practice = ({handleNewCommand, mapData, currentExplanation, directoryStructure, currentPath}) => {
  return (
    <main className="practice-main">
      <h2>Practice</h2>
      <p className="how-to-practice">Use the commands you've learned in the terminal window below. As you run each command, you'll see the visualization of the directory structure update. The directory with the rainbow background is your current working directory.</p>
      <div className="terminal-map-container">
        <Terminal handleNewCommand={handleNewCommand}/>
        <Map
          mapData={mapData}
          currentExplanation={currentExplanation}
          directoryStructure={directoryStructure}
        />
      </div>
    </main>
  );
}

export default Practice;
