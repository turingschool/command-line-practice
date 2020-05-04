import React from 'react';
import Terminal from '../Terminal';
import Map from '../Map';
import './Challenges.scss';
import solutions from '../../solutions';
import solution1 from './assets/solution1.png';

class Challenges extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: {turing: {}},
      currentLevel: 0,
      pathToCurrentLocation: [],
      currentCommand: [],
      currentChallenge: 0,
      justWon: true,
      currentSolution: [
        {title: "root", type: "dir", levelFromRoot: 0 },
        {title: "turing", type: "dir", levelFromRoot: 1 },
      ],
    }
  }

  updateMapData = (title, type) => {
    const path = this.state.pathToCurrentLocation;
    const levelFromRoot = path.length + 1;
    const newItem = {title, type, levelFromRoot};

    this.setState(state => {
      return {currentSolution: [...state.currentSolution, newItem]}
    });
  }

  findDirectDescendants = (path) => {
    return path.reduce((acc, level) => {
      return acc[level];
    }, this.state.directoryStructure);
  }

  validRelationship = (nextDesiredDir) => {
    const descendants = this.findDirectDescendants(this.state.pathToCurrentLocation);
    const checkDirectory = typeof descendants[nextDesiredDir] === 'object';
    const checkExistence = Object.keys(descendants).includes(nextDesiredDir);

    return checkExistence && checkDirectory;
  }

  cdCommand = (path) => {

    if (!path.length) {
      this.setState({pathToCurrentLocation: [], currentLevel: 0});
    } else {
      const desiredPath = path[0].split('/') || [];

      if (desiredPath.includes('..') || this.validRelationship(desiredPath[0])) {
        this.moveToValidDirectory(desiredPath);
      } else {
        return `cd: ${desiredPath[0]}: No such file or directory`;
      }
    }
  }

  moveToValidDirectory = (desiredPath) => {
    desiredPath.forEach((el, index) => {
      if (el === '..' || el === '') {
        this.setState(state => {
          return {
            currentLevel: state.currentLevel - 1,
          }
        });
        this.state.pathToCurrentLocation.pop();
      } else {
        if (this.validRelationship(desiredPath[index])) {
          this.state.pathToCurrentLocation.push(el);
          this.state.currentLevel += 1;
        }
      }
    });
  }

  mkdirCommand = (directoriesToMake) => {
    const directDescendants = this.findDirectDescendants(this.state.pathToCurrentLocation);

    directoriesToMake.forEach(title => {
      directDescendants[title] = {};
      this.updateMapData(title, "dir");
    });
  }

  lsCommand = (commandArg) => {
    if (!commandArg) {
      const directDescendants = Object.keys(this.findDirectDescendants(this.state.pathToCurrentLocation))
      return directDescendants.join(' ');
    } else {
      return 'this terminal does not have the capability to run `ls` with an argument!';
    }
  }

  touchCommand = (filesToMake) => {
    const directDescendants = this.findDirectDescendants(this.state.pathToCurrentLocation);

    filesToMake.forEach(title => {
      directDescendants[title] = null;
      this.updateMapData(title, 'file');
    });
  }

  pwdCommand = () => {
    return `root/${this.state.pathToCurrentLocation.join("/")}`;
  }

  removeCommands = (commandArgs, command) => {
    const descendants = this.findDirectDescendants(this.state.pathToCurrentLocation)
    const descendantList = Object.keys(descendants);
    const path = [...this.state.pathToCurrentLocation];

    let result = null;

    commandArgs.forEach(item => {
      path.push(item);
      const pathToDelete = this.findDirectDescendants(path);
      if (command === 'rm') {
        result = this.rmCommand(descendants, descendantList, item, path);
      } else if (command === 'rmdir') {
        result = this.rmdirCommand(descendants, descendantList, item, path, pathToDelete);
      }

      path.pop();
    });

    return result;
  }

  rmCommand = (descendants, descendantList, file, path) => {
    let result = null;

    if (descendants[file] !== null) {
      result = `rm: ${file}: is a directory`
      return result;
    }

    if (descendantList.includes(file)) {
      delete this.findDirectDescendants(this.state.pathToCurrentLocation)[file];
      this.removeItemFromMapData(path, "file");
    } else {
      result = `rm: ${file}: No such file or directory`;
    }

    return result;
  }

  rmdirCommand = (descendants, descendantList, dir, path, pathToDelete) => {
    let result = null;

    if (descendants[dir] === null) {
      result = `rmdir: ${dir}: Not a directory`
      return result;
    }

    if (descendantList.includes(dir)) {
      if (Object.keys(pathToDelete).length === 0) {
        delete this.findDirectDescendants(this.state.pathToCurrentLocation)[dir];
        this.removeItemFromMapData(path, "dir");
      } else {
        result = `rmdir: ${dir}: Directory not empty`;
      }
    } else {
      result = `rmdir: ${dir}: No such file or directory`;
    }

    return result;
  }

  removeItemFromMapData = (path, type) => {
    const newMapData = [];

    this.state.currentSolution.forEach((el, index, currentSolution) => {
      if (el.levelFromRoot === path.length && type === el.type && el.title === path[path.length - 1]) {
      } else {
        newMapData.push(el);
      }
    });

    this.setState({currentSolution: newMapData});
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
        let outcome = this.removeCommands(commandArgs, 'rm');
        return outcome;
        break;
      case 'rmdir':
        let result = this.removeCommands(commandArgs, 'rmdir');
        return result;
        break;
      default:
        this.setState({currentExplanation: 'You just ran a command that does not exist'});
        return `${commandType}: command not found`;
    }
  }

  checkSolution = () => {
    if (this.state.currentSolution.length === solutions[this.state.currentChallenge].length) {
      const match = this.state.currentSolution.map(item => {
        return solutions[this.state.currentChallenge].map(checkItem => {
          return (item.type === checkItem.type && item.title === checkItem.title) ? true : false;
        });
      });

      const finalCheck = match.every(list => {
        return list.some(value => value === true);
      });

      if (finalCheck) {
        this.setState(state => {
          currentChallenge: state.currentChallenge += 1
        });
        this.setState({justWon: true});
      }
    }
  }

  displayCurrentChallenge = () => {
    return (
      <div>
        <p className="current-challenge">Challenge {this.state.currentChallenge + 1}</p>
        <div className="terminal-map-container">
          <Terminal handleNewCommand={this.handleNewCommand} />
          <Map mapData={solutions[this.state.currentChallenge]} />
        </div>
      </div>
    );
  }

  displayMessage = () => {
    const messages = ['Bravo', 'You are crushing it!', 'Look at you go!', 'Whoo hoo', 'You did the thing!'];
    const randomNum = Math.floor(Math.random() * 5);

    if (this.state.currentChallenge === 0) {
      return (
        <div className="challenges-zero-state">
          <h2>Challenges</h2>
          <p>You have a series of 3 challenges to complete. For each, you will be given a terminal to run commands, and a diagram of the a directory structure.</p>
          <p className="rainbow">Your goal is to create a directory structure that matches what you see in the diagram.</p>
          <p>The diagram will <strong>not</strong> update or tell you where you currently are; you have to use your commands to check what you have. What's already in your directory structure? Use you commands to figure that out, and then add or remove and files and directories necessary. Once you are successful, you'll move to the next level.</p>
          <button className="next-level-btn" onClick={() => this.displayNextChallenge()}>
            Ready to start!
          </button>
        </div>
      )
    } else if (this.state.currentChallenge < 3) {
      return (
        <div className="level-complete-container">
          <h3>{messages[randomNum]}</h3>
          <button className="next-level-btn" onClick={() => this.displayNextChallenge()}>
            Go to Level {this.state.currentChallenge + 1}!
          </button>
        </div>
      );
    } else {
      return (
        <div className="level-complete-container">
          <h3>You've completed all levels!</h3>
        </div>
      );
    }
  }

  displayNextChallenge = () => {
    if (this.state.currentChallenge < 2) {
      this.setState({
        pathToCurrentLocation: [],
        currentLevel: 0,
        justWon: false,
        directoryStructure: {turing: {}},
        currentSolution: [
          {title: "root", type: "dir", levelFromRoot: 0 },
          {title: "turing", type: "dir", levelFromRoot: 1 },
        ],
      });
    } else if (this.state.currentChallenge === 2) {
      this.setState({
        pathToCurrentLocation: ['other'],
        currentLevel: 1,
        justWon: false,
        directoryStructure: {turing: {}, other: { "random-file.rb": null }},
        currentSolution: [
          {title: "root", type: "dir", levelFromRoot: 0 },
          {title: "turing", type: "dir", levelFromRoot: 1 },
          {title: "other", type: "dir", levelFromRoot: 1 },
          {title: "random-file.rb", type: "file", levelFromRoot: 2 },
        ],
      });
    }
  }

  render() {
    solutions[this.state.currentChallenge] ? this.checkSolution() : this.displayMessage();

    return (
      <main className="challenges-main">
        {this.state.justWon ? this.displayMessage() : this.displayCurrentChallenge()}
      </main>
    );
  }
}


export default Challenges;
