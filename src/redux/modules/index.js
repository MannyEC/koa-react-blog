import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { rootReducer } from 'routes';

import auth from './auth';
import GlobalTips from './GlobalTips';
import SimpleForm from './SimpleForm';
import Loading from './Loading';
import UiMessage from './UiMessage';
import GlobalScopeTree from './GlobalScopeTree';
import License from './License';

export default history => combineReducers({
  router: connectRouter(history),
  ...rootReducer,
  auth,
  SimpleForm,
  Loading,
  GlobalTips,
  UiMessage,
  GlobalScopeTree,
  License,
});
