import { getSimpleFormValues } from 'helpers/FormHelper';
import { showUiMessage } from '../UiMessage/actions';
import ActionTypes, {
  PASSWORD_RESET_API_PATH,
  PASSWORD_RESET_SIMPLE_FORM,
} from './constants';

export function resetPassword(params) {
  return (dispatch, getState) => {
    const data = getSimpleFormValues(getState(), PASSWORD_RESET_SIMPLE_FORM);
    dispatch({
      types: [
        ActionTypes.PASSWORD_RESET_LOAD,
        ActionTypes.PASSWORD_RESET_SUCCESS,
        ActionTypes.PASSWORD_RESET_FAILED,
        ActionTypes.PASSWORD_RESET_PARAMS_ERROR
      ],
      promise: client => client.post(PASSWORD_RESET_API_PATH, { params, data }),
      simpleForm: PASSWORD_RESET_SIMPLE_FORM
    }).then(() => dispatch(showUiMessage({
      message: '密码重置成功',
      messageType: 'success'
    })), (response) => {
      if (response.status === 400 && (response.body.token || response.body.uid)) {
        dispatch(showUiMessage({
          message: '链接已失效，请重新申请重置密码',
          messageType: 'error'
        }));
      }
    });
  };
}
