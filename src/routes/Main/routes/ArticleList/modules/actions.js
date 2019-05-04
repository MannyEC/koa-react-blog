import ActionTypes from './constants';

export function loadArticleList() {
  return (dispatch, getState) => {
    dispatch({
      types: [
        ActionTypes.ARTICLE_LIST_LOAD,
        ActionTypes.ARTICLE_LIST_LOAD_SUCCESS,
        ActionTypes.ARTICLE_LIST_LOAD_FAILED,
        ActionTypes.ARTICLE_LIST_LOAD_PARAMS_ERROR
      ],
      promise: client => client.get('/posts'),
    });
  };
}
