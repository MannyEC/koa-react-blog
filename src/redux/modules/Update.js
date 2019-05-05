const UPDATE = 'ads-cloud/update/UPDATE';
const UPDATE_FAIL = 'ads-cloud/update/UPDATE_FAIL';
const CLEAN_UPDATE_ERROR = 'ads-cloud/update/CLEAN_UPDATE_ERROR';

const initialState = {
  updateError: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_FAIL:
      return {
        ...state,
        updateError: action.error.detail ? action.error.detail : 'error'
      };
    case CLEAN_UPDATE_ERROR:
      return {
        ...state,
        updateError: ''
      };
    default:
      return state;
  }
}

export function update() {
  return dispatch => dispatch({
    types: [UPDATE, UPDATE, UPDATE_FAIL],
    promise: client => client.post('/upgrade/update/')
  });
}

export function cleanUpdateError() {
  return dispatch => dispatch({
    type: CLEAN_UPDATE_ERROR
  });
}
