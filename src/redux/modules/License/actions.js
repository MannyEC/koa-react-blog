import ActionTypes from './constants';

export function loadLicense() {
  return dispatch => dispatch({
    types: [
      ActionTypes.LICENSE_LOAD,
      ActionTypes.LICENSE_LOAD_SUCCESS,
      ActionTypes.LICENSE_LOAD_FAILED,
    ],
    promise: client => client.get('/license/getlicensestatus/')
  });
}
