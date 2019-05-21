import ActionTypes from './constants';

const initialState = {
  posts: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.POSTS_LOAD_SUCCESS:
      return { ...state, posts: action.result };
    default:
      return state;
  }
}
