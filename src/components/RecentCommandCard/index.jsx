import React, {useState} from 'react';
import './RecentCommandCard.scss';

const RecentCommandCard = ({currentCommand}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <section className="recent-command-card">
      <h4 onClick={toggleExpand}>{currentCommand || "No command yet..."}</h4>
      <div className={isExpanded ? "show-details" : "hide-details"}>
        <p>details</p>
        <p>details</p>
        <p>details</p>
      </div>
    </section>
  );

}

export default RecentCommandCard;
