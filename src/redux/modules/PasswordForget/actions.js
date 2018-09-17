import { getSimpleFormValues } from 'helpers/FormHelper';
import { showUiMessage } from '../UiMessage/actions';
import ActionTypes, { PASSWORD_FORGET_API_PATH, PASSWORD_FORGET_SIMPLE_FORM } from './constants';

export function forgetPassword() {
  return (dispatch, getState) => {
    const data = getSimpleFormValues(getState(), PASSWORD_FORGET_SIMPLE_FORM);
    dispatch({
      types: [
        ActionTypes.PASSWORD_FORGET_LOAD,
        ActionTypes.PASSWORD_FORGET_SUCCESS,
        ActionTypes.PASSWORD_FORGET_FAILED,
        ActionTypes.PASSWORD_FORGET_PARAMS_ERROR
      ],
      promise: client => client.post(PASSWORD_FORGET_API_PATH, { data }),
      simpleForm: PASSWORD_FORGET_SIMPLE_FORM
    }).then(() => dispatch(showUiMessage({
      message: '重置邮件已经发送，请至邮箱查询',
      messageType: 'success'
    })), (response) => {
      if (response.status === 500) {
        const { error } = getState().PasswordForget;
        dispatch(showUiMessage({
          message: error,
          messageType: 'error'
        }));
      }
    });
  };
}
