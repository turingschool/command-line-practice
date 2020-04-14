import React from 'react';
import './DirectoryViz.scss';
import directoryImg from './assets/directory.jpg';
import arrow from './assets/curved-arrow.png';

const DirectoryViz = () => {
  return (
    <div className="directory second">
      <img className="arrow" src={arrow} alt="Arrow coming from parent directory"/>
      <img src={directoryImg} alt="File folder"/>
      <p>directory name here, from props</p>
    </div>
  );
}

export default DirectoryViz;
