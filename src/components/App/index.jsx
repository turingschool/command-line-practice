import React from 'react';
import Nav from '../Nav';
import Terminal from '../Terminal';
import Map from '../Map';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: { turing: { classwork: {} }, personal: "" },
      pathToCurrentLocation: [],
      currentCommand: [],
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

  cdCommand = (path) => {

    if (!path.length) {
      this.setState({pathToCurrentLocation: []});
    } else {
      const desiredPath = path[0].split('/');

      if (desiredPath.includes('..') || this.validRelationship(desiredPath[0])) {
        this.moveToValidDirectory(desiredPath);
      } else {
        console.log(`cd: ${desiredPath[0]}: No such file or directory`);
      }
    }
  }

  moveToValidDirectory = (desiredPath) => {
    desiredPath.forEach((el, index) => {
      if (el === ".." || el === "") {
        this.state.pathToCurrentLocation.pop();
      } else {
        if (this.validRelationship(desiredPath[index])) {
          this.state.pathToCurrentLocation.push(el);
        }
      }
    });
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
      return directDescendants.join(' ');
    } else {
      return 'this command line does not have the capability to run `ls` with an argument!';
    }
  }

  touchCommand = (filesToMake) => {
    const directDescendants = this.findDirectDescendants();

    filesToMake.forEach(el => {
      directDescendants[el] = "";
    });
  }

  pwdCommand = () => {
    return `root/${this.state.pathToCurrentLocation.join("/")}`;
  }

  handleNewCommand = (command) => {
    this.setState({ currentCommand: command });
    const commandType = command[0];
    const commandArgs = command.slice(1);

    switch (commandType) {
      case 'cd':
        this.cdCommand(commandArgs);
        return null;
        break;
      case 'ls':
        return this.lsCommand(commandArgs[0]);
        break;
      case 'pwd':
        return this.pwdCommand();
        break;
      case 'touch':
        this.touchCommand(commandArgs);
        return null;
        break;
      case 'mkdir':
        this.mkdirCommand(commandArgs);
        return null;
        break;
      case 'rm':
        //code
        break;
      default:
        return `${commandType}: command not found`;
        break;
    }

    this.setState({currentCommand: []});
  }

  render() {
    return (
      <div className="app">
        <Nav />
        <main>
          <Terminal handleNewCommand={this.handleNewCommand}/>
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
