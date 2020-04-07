import React from 'react';
import './terminal.css';

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
    return this.state.previousOutput.map(pair => {
      return (
        <div>
          <p>~ {pair.command}</p>
          <p>{pair.output}</p>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="terminal-window">
        <p>Welcome to the Turing Terminal!</p>
        {this.showPreviousOutput()}
        <label>~</label>
        <input
          className="prompt-input"
          value={this.state.command}
          onChange={this.handleInput}
          onKeyPress={this.submitCommand} />
      </div>
    );
  }
}

export default Terminal;
