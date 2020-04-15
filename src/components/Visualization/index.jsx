import React from 'react';
import './FileViz.scss';
import fileImg from './assets/file.png';
import dirImg from './assets/directory.jpg';
import arrow from './assets/curved-arrow.png';

const Visualization = ({title, type, levelFromRoot}) => {
  const image = type === "dir" ? dirImg : fileImg;
  const className = `level-${levelFromRoot}`;

  return (
    <div className={className}>
      <img className="arrow" src={arrow} alt="Arrow coming from parent directory"/>
      <img src={image} alt={image}/>
      <p>{title}</p>
    </div>
  );
}

export default Visualization;
