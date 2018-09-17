import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { rootReducer } from 'routes';

import auth from './auth';
import GlobalTips from './GlobalTips';
import SimpleForm from './SimpleForm';
import Loading from './Loading';
import SecurityPolicy from './SecurityPolicy';
import UiMessage from './UiMessage';
import PasswordForget from './PasswordForget';
import PasswordReset from './PasswordReset';

import Dashboards from './Dashboards';

export default combineReducers({
  ...rootReducer,
  router: routerReducer,
  auth,
  SimpleForm,
  Loading,
  GlobalTips,
  SecurityPolicy,
  UiMessage,
  PasswordForget,
  PasswordReset,
  Dashboards
});
