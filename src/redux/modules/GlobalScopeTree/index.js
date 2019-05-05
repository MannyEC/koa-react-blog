import ActionTypes from './constants';

const initialState = {
  scopeTree: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.GLOBAL_SCOPE_TREE_LOAD_SUCCESS:
      return { ...state, scopeTree: action.result };
    default:
      return state;
  }
}
