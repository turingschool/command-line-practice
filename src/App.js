import React from 'react';
import Nav from './Nav';
import Terminal from './Terminal';
import Map from './Map';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directoryStructure: {},
      currentLocation: 'root',
      currentCommand: ''
    }
  }

  helperObject = {
    cd: function() {
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

  handleNewCommand = (command) => {
    this.setState({ currentCommand: command });

    const commandType = command[0];
    this.helperObject[commandType]();
    //this.setState({ currentCommand: '' }); ???
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
