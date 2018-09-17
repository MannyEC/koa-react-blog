import ActionTypes from './constants';

export function changeFormFields(key, value, form) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_FIELDS_CHANGE,
    payload: { key, value, form }
  });
}

export function registerForm(form) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_REGISTER,
    payload: { form }
  });
}

export function initialFormData(form, data) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_DATA_INITIAL,
    payload: { data, form }
  });
}

export function resetForm(form) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_RESET,
    payload: { form }
  });
}

