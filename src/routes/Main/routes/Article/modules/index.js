import ActionTypes from './constants';

const initialState = {
  article: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ARTICLE_LOAD_SUCCESS:
      return {
        ...state,
        article: action.result.data,
      };
    default:
      return state;
  }
}
