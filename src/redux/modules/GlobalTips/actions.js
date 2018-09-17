import ActionTypes from './constants';

export function showError(error) {
  return dispatch => dispatch({
    type: ActionTypes.SHOW_ERROR,
    error
  });
}

export function cleanPermissionDenide() {
  return dispatch => dispatch({
    type: ActionTypes.CLEAN_PERMISSION_DENIDE
  });
}

export function cleanError() {
  return dispatch => dispatch({
    type: ActionTypes.CLEAN_ERROR
  });
}
