import ActionTypes from './constants';

const initialState = {
  license: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.LICENSE_LOAD_SUCCESS:
      return {
        ...state,
        license: action.result
      };
    default:
      return state;
  }
}
