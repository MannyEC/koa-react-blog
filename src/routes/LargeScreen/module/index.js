import ActionTypes from './constants';

const initialState = {
  dashboard: {},
  dashboardModules: [],
  currentModule: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.LARGESCREEN_DASHBOARD_CLEAR:
      return { ...state, dashboard: {} };
    case ActionTypes.LARGESCREEN_DASHBOARD_LOAD_SUCCESS:
      return { ...state, dashboard: action.result };
    case ActionTypes.LARGESCREEN_DASHBOARD_MODULES_LOAD:
      return { ...state, dashboardModules: [] };
    case ActionTypes.LARGESCREEN_DASHBOARD_MODULES_LOAD_SUCCESS:
      return { ...state, dashboardModules: action.result };
    case ActionTypes.LARGESCREEN_CURRENT_MODULE_LOAD:
      return { ...state, currentModule: {} };
    case ActionTypes.LARGESCREEN_CURRENT_MODULE_LOAD_SUCCESS:
      return { ...state, currentModule: action.result };
    default:
      return state;
  }
}
