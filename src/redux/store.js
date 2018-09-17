import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import ApiClient from 'helpers/ApiClient';
import clientMiddleware from './middleware/clientMiddleware';
import simpleFormMiddleware from './middleware/simpleFormMiddleware';
import rootReducer from './modules';

export const history = createHistory();
export const client = new ApiClient();

const initialState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  clientMiddleware(client),
  simpleFormMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
