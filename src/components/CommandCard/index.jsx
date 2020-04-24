import React from 'react';
import './CommandCard.scss';

const CommandCard = ({command}) => {

  const displayCommandSnippets = (code) => {
    return code.map(code => {
      if (code.command) {
        return <p className="how-code">$ {code.command}</p>
      } else {
        return <p className="how-code">{code.output}</p>
      }
    });
  }

  const displayExplanations = (explanations) => {
    return explanations.map(part => {
      if (part.text) {
        return <p className="how-text">{part.text}</p>
      } else {
        return (
          <div className="command-card-example">
            {displayCommandSnippets(part.code)}
            <p className="how-code">$ </p>
          </div>
        );
      }
    });
  }

  return (
    <section className="command-card">
      <div className="command-card-header">
        <h2>{command.commandName}</h2>
        <h2>^</h2>
      </div>
      <div className="command-card-content">
        <h3>Why would I use this command?</h3>
        <p>{command.why1}</p>
        <p>{command.why2}</p>
        <h3>How do I use this command?</h3>
        <div>{displayExplanations(command.how)}</div>
        <h3>What are the common mistakes made with this command?</h3>
        <p>{displayExplanations(command.mistakes)}</p>
      </div>
    </section>
  );
}

export default CommandCard;
