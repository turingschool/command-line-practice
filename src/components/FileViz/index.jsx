import React from 'react';
import './FileViz.scss';
import fileImg from './assets/file.png';
import arrow from './assets/curved-arrow.png';

const FileViz = () => {
  return (
    <div className="directory third">
      <img className="arrow" src={arrow} alt="Arrow coming from parent directory"/>
      <img src={fileImg} alt="File folder"/>
      <p>file name will go here, from props</p>
    </div>
  );
}

export default FileViz;
