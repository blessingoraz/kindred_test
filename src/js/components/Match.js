import React from 'react';
import utils from '../lib/utils';
 
const Match = ({ match }) => {  
  const { awayName, homeName, sport, start, awayScore, homeScore } = match;
  const liveEventURL = `https://www.unibet.com/betting#/event/live/${match.id}`;
  return (
    <div>
      <p id="score"> {homeScore} - {awayScore} </p>
      <div id="team-container">
        <img src={utils.getSportIcon(sport)}/>
        <span id="team"> {homeName} - {awayName} </span>
      </div>
      <p id="date"> {utils.convertDate(start)} </p>
      <button id="bet-button"><a href={liveEventURL} target="_blank" rel="noopener noreferrer">Place a bet</a></button>
    </div>
  );
};

export default Match;
