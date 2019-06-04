import ActionTypes from './constants';

export function loadArticle(name) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        ActionTypes.ARTICLE_LOAD,
        ActionTypes.ARTICLE_LOAD_SUCCESS,
        ActionTypes.ARTICLE_LOAD_FAILED,
        ActionTypes.ARTICLE_LOAD_PARAMS_ERROR
      ],
      promise: client => client.get(`/post/${name}`),
    })
  };
}
