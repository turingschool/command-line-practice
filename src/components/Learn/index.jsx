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
      <h2>What is the Command Line?</h2>
      <p>A <strong>command line</strong> is a low-level interface to your computer. Instead of pointing and clicking on things in the finder, we can type text into a command line to interact with the contents of your computer.</p>
      <h2>What is the Terminal and why do we need it?</h2>
      <p>A <strong>terminal</strong> is a program on your computer that lets you interact with the command line - it’s the application you’ll actually type commands into! On your mac, you might use the Terminal or iTerm applications. In this tutorial, we will use a small version of those applications that is built into this site.</p>
      <p>The terminal allows developers to navigate the directories on their computer quickly. When you start off, it may feel like clicking around in the finder is faster than remembering which command to use when, etc. But once you learn and practice them, you’ll notice how much your time is maximized! Additionally, some of the tools you will use as a developer can only be accessed through the terminal.</p>
      <h2>Vocabulary</h2>
      <p>Before you start learning about some must-know commands in the section below, you may want to familiarize yourself with the following vocabulary:</p>
      <ul>
        <li><strong>Command Prompt:</strong> Your terminal will indicate that it’s ready to be given a command when the prompt appears on the left of the window. It is usually a $ sign. When copying and pasting commands from the internet, do not include the $. It is meant to symbolize that a command is run from the terminal.</li>
        <li><strong>Running a command:</strong> Throughout this page and other resources online, you’ll hear folks use the phrase “run the command”. What we mean when we say that is, type the command into the terminal, and then hit return.</li>
        <li><strong>Directory:</strong> Developers, and most documentation you read regarding coding, will refer to folders on a computer as directories.</li>
      </ul>
      {displayCommandCards()}
    </main>
  );
}

export default Learn;
