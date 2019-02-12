import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import RESPONSE_MESSAGES from '../constants/responseMessages';
import utils from '../lib/utils';

const liveMatchURL = 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a';

export function getLiveMatches() {
  return (dispatch) => {
    return axios.get(`${liveMatchURL}`)
      .then((response) => {
        const { liveEvents } = response.data;

        // Get necessary data from liveEvents object
        let matches = liveEvents.map(({
          event : {awayName, homeName, id, sport, start }, 
          liveData: {
            score :{ away: awayScore, home: homeScore} = {}
          }}) => ({
          start,
          awayName,
          homeName,
          id,
          sport,
          awayScore,
          homeScore
        }));

        // Dispatch actions
        dispatch(setLiveMatches(utils.mapMatchesData(matches)));
        dispatch(loadMatches(false));
        dispatch(setTime());
        return RESPONSE_MESSAGES.SUCCESS;
      }).catch(() => {
        dispatch(setErrorMessage(RESPONSE_MESSAGES.FAILED_REQUEST));
        return Promise.reject({
          message: RESPONSE_MESSAGES.FAILED_REQUEST,
          response: {
            status: 400
          }
        });
      });
  };
}

// Set live matches
export function setLiveMatches(matches) {
  return {
    type: ActionTypes.SET_LIVE_MATCHES,
    matches
  };
}

// Set time inorder to cache data for 2mins
export function setTime() {
  return {
    type: ActionTypes.SET_TIME,
    time: Date.now()
  };
}

// Set loading boolean
export function loadMatches(loading) {
  return {
    type: ActionTypes.LOADING_MATCHES,
    loading
  };
}

// Set error messages
export function setErrorMessage(errorMessage) {
  return {
    type: ActionTypes.SET_ERROR_MESSAGE,
    errorMessage
  };
}