import ActionTypes from './constants';

const initialState = {
  isSuccess: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.PASSWORD_FORGET_LOAD:
      return { ...state, isLoading: true };
    case ActionTypes.PASSWORD_FORGET_SUCCESS:
      return { ...state, isSuccess: true, isLoading: false };
    case ActionTypes.PASSWORD_FORGET_FAILED:
      return { ...state, error: action.error.detail, isLoading: false };
    case ActionTypes.PASSWORD_FORGET_PARAMS_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
