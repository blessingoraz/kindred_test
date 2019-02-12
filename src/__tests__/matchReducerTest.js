
import ActionTypes from '../js/constants/actionTypes';
import matchesReducer from '../js/reducers/matches';
import { initialState } from '../js/config/initialState';

describe('Matches Reducer', () => {
  it('returns default state when action type is not supplied', () => {
    const newMatchesState = matchesReducer(initialState.matches, {});
    expect(newMatchesState).toEqual(initialState.matches);
    expect(newMatchesState.matches).toEqual(initialState.matches.matches);
    expect(newMatchesState.loading).toEqual(initialState.matches.loading);
  });

  it('returns correct updated state for setting live matches action', () => {
    const action = {
      type: ActionTypes.SET_LIVE_MATCHES,
      matches: {
        awayName: 'Asernal',
        homeName: 'Chelsea',  
        awayScore: '10',
        homeScore: '0'
      }
    };
    
    const newMatchesState = matchesReducer(initialState.matches.matches, action);
    expect(newMatchesState.matches).toEqual(action.matches);
  });

  it('returns correct updated state for loading matches action', () => {
    const action = {
      type: ActionTypes.LOADING_MATCHES,
      loading: false
    };
    const newMatchesState = matchesReducer(initialState.matches.loading, action);
    expect(newMatchesState.loading).toEqual(false);
  });
});
