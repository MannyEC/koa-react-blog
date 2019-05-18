import ActionTypes from './constants';

export function loadPost() {
  return dispatch => dispatch({
    types: [
      ActionTypes.POSTS_LOAD,
      ActionTypes.POSTS_LOAD_SUCCESS,
      ActionTypes.POSTS_LOAD_FAILED,
    ],
    promise: client => client.get('/posts/'),
  });
}
