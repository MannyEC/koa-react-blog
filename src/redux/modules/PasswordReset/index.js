import ActionTypes from './constants';

const initialState = {
  isSuccess: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.PASSWORD_RESET_SUCCESS:
      return { ...state, isSuccess: true };
    default:
      return state;
  }
}
