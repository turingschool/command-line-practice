import React from 'react';
import './Welcome.scss';

const Welcome = () => {
  return (
    <main class="welcome-main">
      <h2>Welcome!</h2>
      <p>If you are new to using the terminal and want to start dipping your toes in, you are in the right place! This site will walk you through the basic commands a developer can start their journey with. You can interact with the content in multiple ways, but we recommend following this order:</p>
      <ul>
        <li><strong>Learn:</strong> Read about a set of commands - learn what they are used for and how to use them in your terminal</li>
        <li><strong>Practice:</strong> Interact with a terminal in this app to practice using the commands while you see a visual representation of the directories and files</li>
        <li><strong>Study:</strong> Coming soon.</li>
      </ul>
    </main>
  );
}

export default Welcome;
