import { head } from 'lodash';
import { humansize } from 'utils/common';
import ActionTypes from './constants';

const initialState = {
  formData: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.LOAD_SECURITY_POLICY_SUCCESS: {
      const data = head(action.result);
      return { ...state, formData: data };
    }
    case ActionTypes.LOAD_SECURITY_POLICY_FAIL:
      return { ...state };
    case ActionTypes.LOAD_SECURITY_POLICY:
      return { ...state };
    case ActionTypes.UPDATE_SECURITY_POLICY:
      return { ...state };
    case ActionTypes.UPDATE_SECURITY_POLICY_SUCCESS:
      return { ...state };
    case ActionTypes.UPDATE_SECURITY_POLICY_FAIL:
      return { ...state };
    case ActionTypes.UPDATE_SECURITY_POLICY_PARAMS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

