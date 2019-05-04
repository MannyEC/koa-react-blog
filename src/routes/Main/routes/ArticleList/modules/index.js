import ActionTypes from './constants';

const initialState = {
  articleList: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ARTICLE_LIST_LOAD_SUCCESS:
      return {
        ...state,
        articleList: action.result,
      };
    default:
      return state;
  }
}
