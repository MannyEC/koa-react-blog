import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { rootReducer } from 'routes';

import Loading from './Loading';

export default combineReducers({
  ...rootReducer,
  router: routerReducer,
  Loading,
});
