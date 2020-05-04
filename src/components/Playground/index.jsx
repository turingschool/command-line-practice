import React from 'react';
import Terminal from '../Terminal';
import Map from '../Map';
import arrow from './assets/arrow.svg';
import './Playground.scss';

class Playground extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: {turing: {classwork: {}}, "bills.txt": null},
      currentLevel: 0,
      pathToCurrentLocation: [],
      currentCommand: [],
      currentExplanation: '',
      mapData: [
        {title: "root", type: "dir", levelFromRoot: 0, current: true},
        {title: "turing", type: "dir", levelFromRoot: 1, current: false},
        {title: "classwork", type: "dir", levelFromRoot: 2, current: false},
        {title: "bills.txt", type: "file", levelFromRoot: 1, current: false},
      ],
    }

  }

  updateMapData = (title, type) => {
    const path = this.state.pathToCurrentLocation;
    const levelFromRoot = path.length + 1;
    const newItem = {title, type, levelFromRoot, current: false};

    if (levelFromRoot === 1) {
      this.setState(state => {
        return { mapData: [...state.mapData, newItem] }
      });
    } else {
      this.state.mapData.forEach((el, index) => {
        if (el.title === path[path.length -1]) {
          this.state.mapData.splice(index + 1, 0, newItem);
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
      this.updateCurrentWorkingDir([], 0);
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
        this.updateCurrentWorkingDir([], -1);
      } else {
        if (this.validRelationship(desiredPath[index])) {
          this.state.pathToCurrentLocation.push(el);
          this.state.currentLevel += 1;
        }
      }
    });
  }

  updateCurrentWorkingDir = () => {
    const pathToCurrent = this.state.pathToCurrentLocation;

    const updatedMap = this.state.mapData.map((item, i) => {
      const correctTitle = item.title === pathToCurrent[pathToCurrent.length - 1];
      const correctLevel = item.levelFromRoot === this.state.currentLevel;

      if (item.type === 'dir' && correctTitle && correctLevel) {
        item.current = true;
      } else {
        item.current = false;
      }

      return item;
    });

    if (updatedMap.every(item => !item.current)) {
      updatedMap[0].current = true;
    }

    return updatedMap;
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
      return 'this command line does not have the capability to run `ls` with an argument!';
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

    this.state.mapData.forEach((el, index, mapData) => {
      if (el.levelFromRoot === path.length && type === el.type && el.title === path[path.length - 1]) {
      } else {
        newMapData.push(el);
      }
    });

    this.setState({mapData: newMapData});
  }

  handleNewCommand = (command) => {
    this.setState({ currentCommand: command });
    const commandType = command[0];
    const commandArgs = command.slice(1);

    this.setState({currentExplanation: commandType});

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

  render() {
    const mapData = this.updateCurrentWorkingDir();

    return (
      <main className="playground-main">
        <p className="how-to-practice">Practice using the commands you've learned by building out a directory structure, navigating through it, creating or removing files or directories, etc. This is a <em>playground</em> - you can't mess it up!</p>
        <p className="how-to-practice">The diagram represents your starting directory structure. As you create and remove files and directories, you'll see the diagram update to represent your directory structure. In the diagram, <span className="blue">directories are blue</span> and <span className="yellow">files are yellow</span>. The directory with the <span className="rainbow">rainbow background is your working directory</span>.</p>
        <div className="terminal-map-container">
          <Terminal handleNewCommand={this.handleNewCommand}/>
          <Map mapData={this.state.mapData} />
        </div>
      </main>
    );
  }
}

export default Playground;
