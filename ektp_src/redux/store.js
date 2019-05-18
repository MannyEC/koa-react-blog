import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import ApiClient from './ApiClient';
import clientMiddleware from './middleware/clientMiddleware';
import createRootReducer from './modules';

export const history = createHistory();
export const client = new ApiClient();

const initialState = {
};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  clientMiddleware(client),
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(createRootReducer(history), initialState, composedEnhancers);
