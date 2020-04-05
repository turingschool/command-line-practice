import React from 'react';
import Nav from './Nav';
import Terminal from './Terminal';
import Map from './Map';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: { turing: { classwork: {} }, personal: "" },
      pathToCurrentLocation: [],
      currentCommand: [],
      // previousOutput: [],
    }
  }

  findDirectDescendants = () => {
    return this.state.pathToCurrentLocation.reduce((acc, level) => {
      return acc[level];
    }, this.state.directoryStructure);
  }

  validRelationship = (nextDesiredDir) => {
    const descendants = this.findDirectDescendants();
    const checkDirectory = typeof descendants[nextDesiredDir] === "object";
    const checkExistence = Object.keys(descendants).includes(nextDesiredDir);

    return checkExistence && checkDirectory;
  }

  cdCommand = (desiredPath) => {

    if (!desiredPath.length) {
      this.setState({ pathToCurrentLocation: [] });
    } else {
      const splitDesiredPath = desiredPath[0].split("/");

      if (splitDesiredPath.includes('..') || this.validRelationship(splitDesiredPath[0])) {
        splitDesiredPath.forEach((el, index) => {
          if (el === ".." || el === "") {
            this.state.pathToCurrentLocation.pop();
          } else {
            if (this.validRelationship(splitDesiredPath[index])) {
              this.state.pathToCurrentLocation.push(el);
            }
          }
        });
        //display previous command above command prompt
      } else {
        console.log(`cd: ${desiredPath[0]}: No such file or directory`);
        //display previous command + output above command prompt
      }

    }
  }

  mkdirCommand = (directoriesToMake) => {
    const directDescendants = this.findDirectDescendants();

    directoriesToMake.forEach(el => {
      directDescendants[el] = {};
    });
  }

  lsCommand = (commandArg) => {
    if (!commandArg) {
      const directDescendants = Object.keys(this.findDirectDescendants())
      directDescendants.forEach(descendant => {
        console.log(descendant);
      });
    } else {
      console.log("this command line doesn't have the capability to run `ls` with an argument!");
    }
  }

  touchCommand = (filesToMake) => {
    const directDescendants = this.findDirectDescendants();

    filesToMake.forEach(el => {
      directDescendants[el] = "";
    });
  }

  handleNewCommand = (command) => {
    this.setState({ currentCommand: command });
    const commandType = command[0];
    const commandArgs = command.slice(1);

    // LATER: anytime a command is run, we need to store that command + its output
    //use state previousOutput

    switch (commandType) {
      case 'cd':
        this.cdCommand(commandArgs);
        break;
      case 'ls':
        this.lsCommand(commandArgs[0]);
        break;
      case 'pwd':
        //code
        break;
      case 'touch':
        this.touchCommand(commandArgs);
        break;
      case 'mkdir':
        this.mkdirCommand(commandArgs);
        break;
      case 'rm':
        //code
        break;
    }

    this.setState({ currentCommand: '' });
  }

  render() {
    return (
      <div className='App'>
        <Nav />
        <main>
          <Terminal handleNewCommand={ this.handleNewCommand }/>
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
