import ActionTypes from './constants';

const initialState = {
  count: 0,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.LOADING_GLOBAL_SHOW: {
      return {
        count: state.count + 1,
        loading: true
      };
    }
    case ActionTypes.LOADING_GLOBAL_HIDE: {
      const count = state.count - 1;
      if (count > 0) {
        return {
          ...state,
          count
        };
      }
      return {
        count: 0,
        loading: false
      };
    }
    default:
      return state;
  }
}
