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
        let matches = [];

        for(let liveEvent of liveEvents) {
          let { event, liveData } = liveEvent;
          let { awayName, homeName, id, sport, start } = event;
          let { score } = liveData;

          awayName = typeof awayName == 'string' && awayName.trim().length > 0 ? awayName : false;
          homeName = typeof homeName == 'string' && homeName.trim().length > 0 ? homeName : false;
          id = typeof id == 'number' && id > 0 ? id : false;
          sport = typeof sport == 'string' && sport.trim().length > 0 ? sport : false;
          start = typeof start == 'string' && start.trim().length > 0 ? start : false;

          score = typeof score == 'object' && score !== null ? score : false;

          if(event.state === 'STARTED' && awayName && homeName && id && sport && start && score) {
            let matchesData = {};
            matchesData['awayName'] = event.awayName;
            matchesData['homeName'] = event.homeName;
            matchesData['id'] = event.id;
            matchesData['sport'] = event.sport;
            matchesData['start'] = event.start;
            matchesData['awayScore'] = liveData.score.away;
            matchesData['homeScore'] = liveData.score.home;

            matches.push(matchesData);
          }
        }

        dispatch(setLiveMatches(utils.mapMatchesData(matches)));
        dispatch(loadMatches(false));
        return RESPONSE_MESSAGES.SUCCESS;
      }).catch(() => {
        return Promise.reject({
          message: RESPONSE_MESSAGES.FAILED_REQUEST,
          response: {
            status: 400
          }
        });
      });
  };
}

export function setLiveMatches(matches) {
  return {
    type: ActionTypes.SET_LIVE_MATCHES,
    matches
  };
}
export function loadMatches(loading) {
  return {
    type: ActionTypes.LOADING_MATCHES,
    loading
  };
}