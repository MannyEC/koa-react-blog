import ActionTypes from './constants';

const initialState = {
  articleList: [],
  count: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ARTICLE_LIST_LOAD_SUCCESS:
      return {
        ...state,
        articleList: action.result.data,
        count: action.result.count,
      };
    default:
      return state;
  }
}
