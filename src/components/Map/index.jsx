import React from 'react';
import './Map.scss';
import DirectoryViz from '../DirectoryViz';
import FileViz from '../FileViz';

const Map = ({currentExplanation, directoryStructure}) => {

  const digIntoDirs = () => {
    return <p>hiiii</p>
  }

  return (
    <section>
      <p>{digIntoDirs()}</p>
      <p>{currentExplanation}</p>
      <DirectoryViz />
      <DirectoryViz />
      <DirectoryViz />

      <FileViz />
    </section>
  );
}

export default Map;
