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
        bills: null
      },
      pathToCurrentLocation: [],
      currentCommand: [],
      currentExplanation: "",
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
      this.state.mapData.push(newItem);
    } else {
      this.state.mapData.forEach((el, index) => {
        if (el.title === path[path.length -1]) {
          this.state.mapData.splice(index + 1, 0, newItem);
        }
      });
    }
  }

  findDirectDescendants = (path) => {
    // most use this.state.pathToCurrentLocation
    return path.reduce((acc, level) => {
      return acc[level];
    }, this.state.directoryStructure);
  }

  validRelationship = (nextDesiredDir) => {
    const descendants = this.findDirectDescendants(this.state.pathToCurrentLocation);
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
      directDescendants[title] = "";
      this.updateMapData(title, "file");
    });
  }

  pwdCommand = () => {
    return `root/${this.state.pathToCurrentLocation.join("/")}`;
  }

  rmCommand = (commandArgs) => {
    // can pass multiple arguments
    console.log(commandArgs);
  }

  rmdirCommand = (commandArgs) => {
    const descendants = Object.keys(this.findDirectDescendants(this.state.pathToCurrentLocation));
    const path = [...this.state.pathToCurrentLocation];

    let result = null;

    commandArgs.forEach(dir => {
      path.push(dir);
      const pathToDelete = this.findDirectDescendants(path);

      if (descendants.includes(dir)) {
        if (Object.keys(pathToDelete).length === 0) {
          delete this.findDirectDescendants(this.state.pathToCurrentLocation)[dir];
          this.removeItemFromMapData(path);
        } else {
          result = `rmdir: ${dir}: Directory not empty`;
        }
      } else {
        result = `rmdir: ${dir}: No such file or directory`;
      }
      path.pop();
    });

    return result;
  }

  removeItemFromMapData = (path) => {
    this.state.mapData.forEach((el, index, mapData) => {
      if (el.levelFromRoot === path.length) {
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
        this.rmCommand(commandArgs);
        break;
      case 'rmdir':
        return this.rmdirCommand(commandArgs);
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
