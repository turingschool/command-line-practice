import React from 'react';
import Nav from '../Nav';
import Terminal from '../Terminal';
import Map from '../Map';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: {
        turing: {
          classwork: {},
        },
        "bills.txt": null
      },
      pathToCurrentLocation: [],
      currentCommand: [],
      currentExplanation: '',
      mapData: [
        {title: "turing", type: "dir", levelFromRoot: 1},
        {title: "classwork", type: "dir", levelFromRoot: 2},
        {title: "bills.txt", type: "file", levelFromRoot: 1},
      ]
    }

  }

  updateMapData = (title, type) => {
    const path = this.state.pathToCurrentLocation;
    const levelFromRoot = path.length + 1;
    const newItem = {title, type, levelFromRoot};

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
      if (el === '..' || el === '') {
        this.state.pathToCurrentLocation.pop();
      } else {
        if (this.validRelationship(desiredPath[index])) {
          this.setState(state => {
            return {
              pathToCurrentLocation: [...state.pathToCurrentLocation, el]
            }
          });
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
      return 'this command line does not have the capability to run `ls` with an argument!';
    }
  }

  touchCommand = (filesToMake) => {
    const directDescendants = this.findDirectDescendants(this.state.pathToCurrentLocation);

    filesToMake.forEach(title => {
      directDescendants[title] = '';
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
      return;
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
      return;
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
    this.state.mapData.forEach((el, index, mapData) => {
      if (el.levelFromRoot === path.length && type === el.type) {
        mapData.splice(index, 1);
      }
    });
  }

  handleNewCommand = (command) => {
    this.setState({ currentCommand: command });
    const commandType = command[0];
    const commandArgs = command.slice(1);

    const explanations = {
      'cd': 'You just ran cd.',
      'ls': 'You just ran ls.',
      'pwd': 'You just ran pwd.',
      'touch': 'You just ran touch.',
      'mkdir': 'You just ran mkdir.',
      'rm': 'You just ran rm',
      'rmdir': 'You just ran rmdir',
     }

    this.setState({currentExplanation: explanations[commandType]});

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
    return (
      <div className="app">
        <Nav />
        <main>
          <Terminal handleNewCommand={this.handleNewCommand}/>
          <Map
            mapData={this.state.mapData}
            currentExplanation={this.state.currentExplanation}
            directoryStructure={this.state.directoryStructure}  />
        </main>
      </div>
    );
  }
}

export default App;
