import React from 'react';
import './Terminal.scss';

class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      command: '',
      previousOutput: []
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

      this.state.previousOutput.push({command, output});
      this.setState({command: ''});
    }
  }

  showPreviousOutput = () => {
    const previousOutput = this.state.previousOutput.map(pair => {
      return (
        <div>
          <p className="mono">~
            <span className="output">{pair.command}</span>
          </p>
          <p className="mono">{pair.output}</p>
        </div>
      )
    });

    return this.showWelcomeMessage(previousOutput);
  }

  showWelcomeMessage = (previousOutput) => {
    if (previousOutput.length) {
      return previousOutput;
    } else {
      const command = 'Welcome! Start by typing a command...'
      this.state.previousOutput.push({command, output: null});
      return (
        <p className="mono">~
          <span className="output">{command}</span>
        </p>
      );
    }
  }

  render() {
    return (
      <div className="terminal-window">
        {this.showPreviousOutput()}
        <label
          className="command-prompt mono"
          htmlFor="command-input"
        >
          ~
        </label>
        <input
          id="command-input"
          className="prompt-input mono"
          value={this.state.command}
          onChange={this.handleInput}
          onKeyPress={this.submitCommand}
        />
      </div>
    );
  }
}

export default Terminal;
