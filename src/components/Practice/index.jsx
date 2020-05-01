import React, {useState} from 'react';
import Terminal from '../Terminal';
import Map from '../Map';

import './Practice.scss';

const Practice = ({handleNewCommand, mapData, currentExplanation, directoryStructure, currentPath}) => {
  const [isReturnVisitor, setVisitorStatus] = useState(false);

  const changeVisitorStatus = () => {
    setVisitorStatus(!isReturnVisitor);
  }

  const displayNewVisitorView = () => {
    return (
      <div className="how-to-practice-section">
        <h2>Practice</h2>
        <p className="how-to-practice">In this section, you will practice the commands you've learned. You'll be provided with a terinal window to run the commands, and next to it, a diagram that shows a visual representation of the direcotry structure you are working with. It will change as you add and remove files and directories.</p>
        <p className="how-to-practice">Build out a directory structure and navigate through it, delete files or directories, etc. - get comfortable with it! As you run each command, you'll see the diagram update. The directory with the rainbow background is your current working directory.</p>
        <button className="start-btn" onClick={changeVisitorStatus}>Got It! Let's get started ➡</button>
      </div>
    );
  }

  const displayReturnVisitorView = () => {
    return (
      <div class="practice-started">
        <div className="terminal-map-container">
          <Terminal handleNewCommand={handleNewCommand}/>
          <Map
          mapData={mapData}
          currentExplanation={currentExplanation}
          directoryStructure={directoryStructure}
          />
        </div>
        <button class="show-directions-btn" onClick={changeVisitorStatus}>⬅ Show me the directions again</button>
      </div>
    );
  }

  return (
    <main className="practice-main">
      {isReturnVisitor ? displayReturnVisitorView() : displayNewVisitorView()}
    </main>
  );
}

export default Practice;
