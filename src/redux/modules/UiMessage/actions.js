import ActionTypes from './constants';

export function hideUiMessage() {
  return dispatch => dispatch({
    type: ActionTypes.UI_MESSAGE_HIDE
  });
}

export function showUiMessage(payload) {
  return dispatch => dispatch({
    type: ActionTypes.UI_MESSAGE_SHOW,
    payload
  });
}
