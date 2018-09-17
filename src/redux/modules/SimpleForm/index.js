import { cloneDeep } from 'lodash';
import ActionTypes from './constants';

const initialState = {};

const defaultFormState = {
  formData: {},
  errors: {}
};

const handleFormFieldsChange = (state, action) => {
  const { key, value, form } = action.payload;
  const targetForm = state[form] ? cloneDeep(state[form]) : { ...defaultFormState };
  targetForm.formData[key] = value;
  return { ...state, [form]: targetForm };
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.SIMPLE_FORM_FIELDS_CHANGE:
      return handleFormFieldsChange(state, action);
    case ActionTypes.SIMPLE_FORM_FIELDS_ERROR:
    case ActionTypes.SIMPLE_FORM_FIELDS_ERROR_CLEAR: {
      const { form, errors } = action.payload;
      const targetForm = state[form] ? cloneDeep(state[form]) : { ...defaultFormState };
      targetForm.errors = { ...errors } || {};
      return { ...state, [form]: targetForm };
    }
    case ActionTypes.SIMPLE_FORM_REGISTER:
    case ActionTypes.SIMPLE_FORM_RESET: {
      const { form } = action.payload;
      return { ...state, [form]: { formData: {}, errors: {} } };
    }
    case ActionTypes.SIMPLE_FORM_DATA_INITIAL: {
      const { form, data } = action.payload;
      const initialFormState = { ...defaultFormState, formData: data };
      return { ...state, [form]: initialFormState };
    }
    default:
      return state;
  }
}
