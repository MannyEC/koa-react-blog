import ActionTypes from './constants';

export function loadArticleList(postType, postTag, page) {
  const params = {
    postTag,
    postType,
    page
  };

  return (dispatch, getState) => {
    // it's necessary to return dispath
    return dispatch({
      types: [
        ActionTypes.ARTICLE_LIST_LOAD,
        ActionTypes.ARTICLE_LIST_LOAD_SUCCESS,
        ActionTypes.ARTICLE_LIST_LOAD_FAILED,
        ActionTypes.ARTICLE_LIST_LOAD_PARAMS_ERROR
      ],
      promise: client => client.get('/posts', { params }),
    });
  };
}
