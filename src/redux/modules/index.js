import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { rootReducer } from 'routes';

const initState = {
  name: 'eckid'
};

function todos(state = initState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}

export default history => combineReducers({
  router: connectRouter(history),
  ...rootReducer,
  auth: todos,
});
