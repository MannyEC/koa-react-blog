import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import { routerMiddleware } from 'connected-react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import createRootReducer from '../../src/redux/modules';
import ApiClient from '../../src/redux/ApiClient';
import clientMiddleware from '../../src/redux/middleware/clientMiddleware';

export const client = new ApiClient();

const getCreateStore = (ctx) => {
  const initialState = {};
  const path = ctx.req.url;
  const history = createMemoryHistory({ initialEntries: [path] });
  const middleware = [
    routerMiddleware(history),
    clientMiddleware(client),
  ];
  const composedEnhancers = compose(applyMiddleware(...middleware));
  const store = createStore(createRootReducer(history), initialState, composedEnhancers);
  return { history, store };
};

export default getCreateStore;
