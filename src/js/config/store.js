import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducers from '../reducers/index';
import { initialState } from './initialState';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

let enhancer;

switch (process.env.NODE_ENV) {
  case 'production':
    enhancer = compose(
      applyMiddleware(thunkMiddleware),
      persistState()
    );
    break;
  case 'test':
    enhancer = compose(
      applyMiddleware(thunkMiddleware)
    );
    break;
  default:
    enhancer = composeWithDevTools(
      applyMiddleware(thunkMiddleware),
      persistState()
    );
}

const configureStore = () => {
  return createStore(reducers, initialState, enhancer);
};

export const store = configureStore();


export default store;