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
      currentSolution: [
        {title: "root", type: "dir", levelFromRoot: 0, current: true },
        {title: "turing", type: "dir", levelFromRoot: 1 },
      ],
    }
  }

  updateMapData = (title, type) => {
    const path = this.state.pathToCurrentLocation;
    const levelFromRoot = path.length + 1;
    const newItem = {title, type, levelFromRoot};

    if (levelFromRoot === 1) {
      this.setState(state => {
        return { currentSolution: [...state.currentSolution, newItem] }
      });
    } else {
      this.state.currentSolution.forEach((el, index) => {
        if (el.title === path[path.length -1]) {
          this.state.currentSolution.splice(index + 1, 0, newItem);
        }
      });
    }
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
        this.checkSolution();
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
        this.checkSolution();
        return null;
        break;
      case 'mkdir':
        this.mkdirCommand(commandArgs);
        this.checkSolution();
        return null;
        break;
      case 'rm':
        let outcome = this.removeCommands(commandArgs, 'rm');
        this.checkSolution();
        return outcome;
        break;
      case 'rmdir':
        outcome = this.removeCommands(commandArgs, 'rmdir');
        this.checkSolution();
        return outcome;
        break;
      default:
        this.setState({currentExplanation: 'You just ran a command that does not exist'});
        return `${commandType}: command not found`;
    }
  }

  checkSolution = () => {
    if (this.state.currentSolution.length === solutions[0].length) {
      const currentSolution = JSON.stringify(this.state.currentSolution);

      const match = solutions[0].every(item => {
        return currentSolution.includes(JSON.stringify(item));
      });

      if (match) {
        this.setState(state => {
          currentChallenge: state.currentChallenge += 1
        });
      } else {
        console.log("not yet...");
      }
    }
  }

  displayCurrentChallenge = () => {
    solutions.forEach(solution => {
      solution[0].current = true;
    });

    return (
      <div>
        <p className="challenge-text">
          <strong>Challenge {this.state.currentChallenge + 1}: </strong>The diagram on the right no longer represents your current directory structure; you goal is to create that structure. Use commands you know to discover what you are starting with, then add the appropriate files and directories.</p>
        <div className="terminal-map-container">
            <Terminal handleNewCommand={this.handleNewCommand} />
            <Map mapData={solutions[this.state.currentChallenge]} />
        </div>
      </div>
    );
  }

  render() {
    // can't call here since it sets state!
    // this.checkSolution();

    return (
      <main className="challenges-main">
        {this.displayCurrentChallenge()}
      </main>
    );
  }
}


export default Challenges;
