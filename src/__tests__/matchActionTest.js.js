import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as mockData from '../mockData';

import ActionTypes from '../js/constants/actionTypes';
import { getLiveMatches } from '../js/actions/match';
import RESPONSE_MESSAGES from '../js/constants/responseMessages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  let store = null;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should return live matches', (done) => {
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);
    store.dispatch(getLiveMatches()).then(() => {
      const setMatches = store.getActions()[0];
      const loadMatches = store.getActions()[1];

      expect(setMatches.type).toEqual(ActionTypes.SET_LIVE_MATCHES);
      expect(setMatches.matches.length).toEqual(mockData.length);

      expect(loadMatches.type).toEqual(ActionTypes.LOADING_MATCHES);
      expect(loadMatches.loading).toBe(false);
      done();
    });
  });

  it('should return errors as received', () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      message: RESPONSE_MESSAGES.FAILED_REQUEST,
      response: {
        status: 400
      }
    });

    return store.dispatch(getLiveMatches()).catch((error) => {
      const setErrorMessage = store.getActions()[0];
      expect(setErrorMessage.errorMessage).toEqual(error.message);
    });
  });
});