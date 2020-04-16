import React from 'react';
import './FileViz.scss';
import fileImg from './assets/file.png';
import dirImg from './assets/directory.jpg';

const Visualization = ({title, type, levelFromRoot}) => {

  return (
    <div className={`level-${levelFromRoot} directory`}>
      <img
        className="dir-file-image"
        src={type === "dir" ? dirImg : fileImg}
        alt={type === "dir" ? "File folder icon" : "File icon"}
      />
      <p class="dir-file-title">{title}</p>
    </div>
  );
}

export default Visualization;
