import ActionTypes from './constants';

const initialState = {
  errors: [],
  warning: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.SHOW_ERROR:
      return {
        ...state,
        errors: action.error
      };
    case ActionTypes.PERMISSION_DENIDE:
      return {
        ...state,
        warning: true
      };
    case ActionTypes.CLEAN_ERROR:
      return {
        ...state,
        errors: []
      };
    case ActionTypes.CLEAN_PERMISSION_DENIDE:
      return {
        ...state,
        warning: false
      };
    default:
      return state;
  }
}
