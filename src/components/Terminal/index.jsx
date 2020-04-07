import React from 'react';
import './terminal.css';

class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      command: ''
    }

  }

  handleInput = (event) => {
    this.setState({command: event.target.value});
  }

  submitCommand = (event) => {
    if (event.key === 'Enter') {
      const splitCommand = this.state.command.split(' ');
      this.props.handleNewCommand(splitCommand);
      this.setState({command: ''});
    }
  }

  showPreviousOutput = () => {
      return (
        <p>is this working???</p>
      )
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
