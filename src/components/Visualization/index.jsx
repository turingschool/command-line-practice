import React from 'react';
import './Visualization.scss';
import fileImg from './assets/file.png';
import dirImg from './assets/dir.svg';

const Visualization = ({title, type, levelFromRoot}) => {

  return (
    <div className={`level-${levelFromRoot} ${type}`}>
      <img
        className="dir-file-image"
        src={type === "dir" ? dirImg : fileImg}
        alt={type === "dir" ? "File folder icon" : "File icon"}
      />
      <p className="dir-file-title">{title}</p>
    </div>
  );
}

export default Visualization;
