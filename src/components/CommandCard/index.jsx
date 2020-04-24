import React from 'react';
import './CommandCard.scss';

class CommandCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    }
  }

  displayCommandSnippets = (code) => {
    return code.map(code => {
      if (code.command) {
        return <p className="how-code">$ {code.command}</p>
      } else {
        return <p className="how-code">{code.output}</p>
      }
    });
  }

  displayExplanations = (explanations) => {
    return explanations.map(part => {
      if (part.text) {
        return <p className="how-text">{part.text}</p>
      } else {
        return (
          <div className="command-card-example">
          {this.displayCommandSnippets(part.code)}
          <p className="how-code">$ </p>
          </div>
        );
      }
    });
  }

  toggleExpand = () => {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    const {command} = this.props;

    return (
      <section className="command-card">
        <div
          className="command-card-header"
          onClick={this.toggleExpand}
        >
          <h2>{command.commandName}</h2>
          <h2>^</h2>
        </div>
        <div className={this.state.isExpanded ? "command-card-content" : "hide"}>
          <h3>Why would I use this command?</h3>
          <p>{command.why1}</p>
          <p>{command.why2}</p>
          <h3>How do I use this command?</h3>
          <div>{this.displayExplanations(command.how)}</div>
          <h3>What are the common mistakes made with this command?</h3>
          <div>{this.displayExplanations(command.mistakes)}</div>
        </div>
      </section>
    );
  }
}


export default CommandCard;
