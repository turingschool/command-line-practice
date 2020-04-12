import React from 'react';
import './Map.scss';

const Map = ({currentExplanation}) => {
  return (
    <section>
      <p>{currentExplanation}</p>
      <p>telling you what the command you just ran does</p>
      <p>telling you where you are in the dir structure</p>
    </section>
  );
}

export default Map;
