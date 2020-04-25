import React from 'react';
import './Terminal.scss';

class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: null,
      command: '',
      previousOutput: [{command: '', output: ''}]
    }
  }

  handleInput = (event) => {
    this.setState({command: event.target.value});
  }

  submitCommand = (event) => {
    if (event.key === 'Enter') {
      const command = this.state.command;
      const splitCommand = command.split(' ');
      const output = this.props.handleNewCommand(splitCommand);

      this.setState(state => {
        return {
          previousOutput: [...state.previousOutput, {command, output}],
          command: '',
        }
      });
    }
  }

  showWelcomeMessage = () => {
    return (
      <p className="mono welcome">Welcome! Type in any command...</p>
    );
  }

  showPreviousOutput = () => {
    return this.state.previousOutput.map((pair, index) => {
      if (pair.command) {
        return (
          <div key={index}>
            <p className="mono">$
            <span className="output">{pair.command}</span>
            </p>
            <p className="mono">{pair.output}</p>
          </div>
        )
      }
    });
  }

  cycleCommands = (event) => {
    const indexToCheck = this.state.index === null ? this.state.previousOutput.length : this.state.index;

    if (event.key === "ArrowUp") {
      this.showPreviousCommand(indexToCheck);
    } else if (event.key === "ArrowDown") {
      this.showNextCommand(indexToCheck);
    }
  }

  showPreviousCommand = (indexToCheck) => {
    if (this.state.previousOutput[indexToCheck - 1]) {
      this.setState({
        index: indexToCheck - 1,
        command: this.state.previousOutput[indexToCheck - 1].command,
      });
    } else {
      this.setState({index: null});
    }
  }

  showNextCommand = (indexToCheck) => {
    if (this.state.previousOutput[indexToCheck + 1]) {
      this.setState({
        index: indexToCheck + 1,
        command: this.state.previousOutput[indexToCheck + 1].command,
      });
    } else {
      this.setState({
        index: null,
        command: '',
      });
    }
  }

  render() {
    return (
      <div className="terminal-window">
        {this.showWelcomeMessage()}
        {this.showPreviousOutput()}
        <label
          className="command-prompt mono"
          htmlFor="command-input"
        >
          $
        </label>
        <input
          id="command-input"
          className="prompt-input mono"
          value={this.state.command}
          onChange={this.handleInput}
          onKeyPress={this.submitCommand}
          onKeyDown={this.cycleCommands}
          autcomplete="off"
        />
      </div>
    );
  }
}

export default Terminal;
