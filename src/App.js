import React from 'react';
import Nav from './Nav';
import Terminal from './Terminal';
import Map from './Map';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: { turing: { classwork: {} }, personal: { } },
      pathToCurrentLocation: [],
      currentCommand: [],
      // previousOutput: [],
    }
  }

  helperObject = {
    cd: function() {
      if (this.state.currentCommand.length === 1) {
        this.setState({ currentLoction: {} });
      } else {
        const dirToMoveTo = this.state.currentCommand[1];
        // just pretend we will get a string of a dir name, no ".."s.
        this.setState({ currentLoction: { dirToMoveTo: {} } });
      }
      //change this.state.currentLoction based on arguments -
        // none - go to root
        // .. - go up one level
        // dirname - check if it is a child of this.state.currentLocation, if so, move there.
        // file name - give "cd: <filename>: Not a directory"
    },
    ls: function() {
      // return all direct descendants of this.state.currentLocation
    },
    pwd: function() {
      // return this.state.currentLocation
    },
    touch: function() {
      // create file in this.state.currentLocation
        // be ready for >=1 arguments
    },
    mkdir: function() {
      // create dir in this.state.currentLocation
        // be ready for >=1 arguments
    },
    rm: function() {
      //check if it was rm -rf first, then do necessary work based on rm or rm -rf
        // be ready for >=1 arguments
    }
  };

  checkValidRelationship = (nextDesiredDirectory) => {
    const descendants = this.state.pathToCurrentLocation.reduce((acc, level, i) => {
      return acc[level];
    }, this.state.directoryStructure);

    return Object.keys(descendants).includes(nextDesiredDirectory);
  }

  cdCommand = (desiredPath) => {
    if (!desiredPath.length) {
      this.setState({ pathToCurrentLocation: [] });
    } else {
      const splitDesiredPath = desiredPath[0].split("/");

      if (splitDesiredPath.includes('..') || this.checkValidRelationship(splitDesiredPath[0])) {
        splitDesiredPath.forEach((el, index) => {
          if (el === ".." || el === "") {
            this.state.pathToCurrentLocation.pop();
          } else {
            if (this.checkValidRelationship(splitDesiredPath[index])) {
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
        // console.log(directChildren());
        break;
      case 'pwd':
        //code
        break;
      case 'touch':
        //code
        break;
      case 'mkdir':
        //code
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
