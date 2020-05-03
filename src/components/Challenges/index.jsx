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
        {title: "root", type: "dir", levelFromRoot: 0 },
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
        return this.removeCommands(commandArgs, 'rm');
        break;
      case 'rmdir':
        return this.removeCommands(commandArgs, 'rmdir');
        break;
      default:
        this.setState({currentExplanation: 'You just ran a command that does not exist'});
        return `${commandType}: command not found`;
    }

    this.setState({currentCommand: []});
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
        })
      } else {
        console.log("not yet...");
      }
    }
  }

  displayReturnVisitorView = () => {
    const mapData1 = [
      {title: "root", type: "dir", levelFromRoot: 0, current: true},
      {title: "turing", type: "dir", levelFromRoot: 1 },
      {title: "0mod", type: "dir", levelFromRoot: 2 },
      {title: "personal", type: "dir", levelFromRoot: 1 },
    ];
    //also solutions[0] ^^^
    return (
      <div>
        <p className="challenge-text">Challenge 1: The diagram on the right no longer represents your current directory structure; you goal is to create that structure. Use commands you know to discover what you are starting with, then add the appropriate files and directories.</p>
        <div className="terminal-map-container">
            <Terminal
              handleNewCommand={this.handleNewCommand}
            />
            <Map mapData={mapData1} />
        </div>
      </div>
    );
  }

  updateCurrentWorkingDir = () => {
    const pathToCurrent = this.state.pathToCurrentLocation;

    const updatedMap = this.state.currentSolution.map((item, i) => {
      const correctTitle = item.title === pathToCurrent[pathToCurrent.length - 1];
      const correctLevel = item.levelFromRoot === this.state.currentLevel;

      // if (item.type === 'dir' && correctTitle && correctLevel) {
      //   item.current = true;
      // } else {
      //   item.current = false;
      // }

      return item;
    });

    if (updatedMap.every(item => !item.current)) {
      updatedMap[0].current = true;
    }

    return updatedMap;
  }

  render() {
    console.log(this.state.currentSolution);
    // this.updateCurrentWorkingDir();
    this.checkSolution();

    return (
      <main className="challenges-main">
        {this.displayReturnVisitorView()}
      </main>
    );
  }
}


export default Challenges;
