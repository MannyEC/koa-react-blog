import ActionTypes from './constants';

export function changeFormFields(key, value, form) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_FIELDS_CHANGE,
    payload: { key, value, form }
  });
}

/*
  registerForm is called when provider component is mount, it use
  to set form params to SimpleForm in redux
*/
export function registerForm(form, data) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_REGISTER,
    payload: { data, form }
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

/*
  dumpForm is use to copy current form data into Simplefrom[form].dumpdata
  if you need to record a shortcut of form data, use it.
*/
export function dumpForm(form) {
  return dispatch => dispatch({
    type: ActionTypes.SIMPLE_FORM_DUMP,
    payload: { form }
  });
}
