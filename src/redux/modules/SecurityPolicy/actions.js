import { cloneDeep } from 'lodash';
import ActionTypes, { SECURITY_POLICY_API_PATH, SECURITY_POLICY_FROM } from './constants';
import { showUiMessage } from '../UiMessage/actions';
import { initialFormData } from '../SimpleForm/actions';

export function loadSecurityPolicy() {
  return (dispatch, getState) => dispatch({
    types: [
      ActionTypes.LOAD_SECURITY_POLICY,
      ActionTypes.LOAD_SECURITY_POLICY_SUCCESS,
      ActionTypes.LOAD_SECURITY_POLICY_FAIL
    ],
    promise: client => client.get('/security/get/')
  }).then(() => {
    const { formData } = getState().SecurityPolicy;
    dispatch(initialFormData(SECURITY_POLICY_FROM, formData));
  });
}

export function updateSecurityPolicy() {
  return (dispatch, getState) => {
    const data = cloneDeep(getState().SimpleForm[SECURITY_POLICY_FROM].formData);
    if (data.acl_type === 'disabled') {
      data.acl_hosts = [];
    }
    dispatch({
      types: [
        ActionTypes.UPDATE_SECURITY_POLICY,
        ActionTypes.UPDATE_SECURITY_POLICY_SUCCESS,
        ActionTypes.UPDATE_SECURITY_POLICY_FAIL,
        ActionTypes.UPDATE_SECURITY_POLICY_PARAMS_ERROR
      ],
      promise: client => client.put(`${SECURITY_POLICY_API_PATH}/`, { data }),
      simpleForm: SECURITY_POLICY_FROM
    }).then(() => dispatch(showUiMessage({
      message: '保存成功',
      messageType: 'success'
    })));
  };
}

export function resetForm() {
  return (dispatch) => {
    dispatch(loadSecurityPolicy());
  };
}
