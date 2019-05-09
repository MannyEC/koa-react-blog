import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import { routerMiddleware } from 'connected-react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import createRootReducer from '../../ektp_src/redux/modules';

// export const history = createMemoryHistory();

const getCreateStore = (ctx) => {
  const initialState = {};
  const path = ctx.req.url;
  const history = createMemoryHistory({ initialEntries: [path] });
  const middleware = [routerMiddleware(history)];
  const composedEnhancers = compose(applyMiddleware(...middleware));
  const store = createStore(createRootReducer(history), initialState, composedEnhancers);
  return { history, store };
};

export default getCreateStore;
