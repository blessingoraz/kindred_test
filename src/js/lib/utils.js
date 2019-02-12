import football from '../../images/icons/football.png';
import basketball from '../../images/icons/basketball.png';
import tennis from '../../images/icons/tennis.png';
import defaultImg from '../../images/icons/default.png';

// Container for utils
const utils = {};

// Convert live matches array to an object
utils.mapMatchesData = (matches) => {
  return matches && matches.reduce((acc, match) => {
    acc[match.id] = match;
    return acc;
  }, {});   
};

// Format date string
utils.convertDate = (dateString) => {
  const currentDate = new Date().toISOString().slice(0,10);
  const matchDate = dateString.slice(0, 10);
  const time = `${new Date(dateString).getHours()} : ${new Date(dateString).getMinutes()}`;
  return currentDate == matchDate ? `Today, ${time}` : `${matchDate}, ${time}`;
};

// Map image path to sport
utils.getSportIcon = (sportName) => {
  sportName = typeof sportName == 'string' && sportName.trim().length > 0 ? sportName : false;
  if(sportName) {
    const imagePaths = {
      'FOOTBALL': football,
      'TENNIS': tennis,
      'BASKETBALL': basketball
    };
    return imagePaths[sportName] || defaultImg;
  }
};

export default utils;