import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../reducers/auth-reducer';
import { navItemsPerClient } from '../reducers/nav-items-reducer';

const logger = createLogger();
const reducer = combineReducers(
  {
    auth,
    navItemsPerClient
  }
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}