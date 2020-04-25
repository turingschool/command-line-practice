import React, {useState} from 'react';
import './CommandCard.scss';
import arrow from './assets/arrow.svg';

const CommandCard = ({command}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <section className="command-card">
      <div
        className="command-card-header"
        onClick={toggleExpand}
      >
        <h2>{command.commandName}</h2>
        <img className={isExpanded ? "expanded" : "collapsed"} alt="expand collapse icon" src={arrow}/>
      </div>
      <div className={isExpanded ? "command-card-content" : "hide"}>
        <h3>Why would I use this command?</h3>
        <p>{command.why1}</p>
        <p>{command.why2}</p>
        <h3>How do I use this command?</h3>
        <div>{displayExplanations(command.how)}</div>
        <h3>What are the common mistakes made with this command?</h3>
        <div>{displayExplanations(command.mistakes)}</div>
      </div>
    </section>
  );
}

export default CommandCard;
