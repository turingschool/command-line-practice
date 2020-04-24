import React from 'react';
import './Learn.scss';
import CommandCard from '../CommandCard';
import commandData from '../../commandData';

const Learn = () => {

  const displayCommandCards = () => {
    return commandData.map((command, index) => {
      return (
        <CommandCard
          key={index}
          command={command}
        />
      )
    });
  }

  return (
    <main className="learn-main">
      <h1>Learn</h1>
      {displayCommandCards()}
    </main>
  );
}

export default Learn;
