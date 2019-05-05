import { cloneDeep } from 'lodash';
import ActionTypes from './constants';

const initialState = {};

const defaultFormState = {
  useDump: false,
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
    case ActionTypes.SIMPLE_FORM_REGISTER: {
      const { form } = action.payload;
      if (state[form]) return { ...state };
      return { ...state, [form]: { formData: {}, errors: {}, dumpdata: {} } };
    }
    case ActionTypes.SIMPLE_FORM_DUMP: {
      const { form } = action.payload;
      const targetForm = state[form] ? cloneDeep(state[form]) : { ...defaultFormState };
      const curData = cloneDeep(targetForm.formData);
      targetForm.dumpdata = curData;
      return { ...state, [form]: targetForm };
    }
    case ActionTypes.SIMPLE_FORM_RESET: {
      const { form } = action.payload;
      return { ...state, [form]: { formData: {}, errors: {}, dumpdata: {} } };
    }
    case ActionTypes.SIMPLE_FORM_DATA_INITIAL: {
      const { form, data } = action.payload;
      const initialFormState = { ...defaultFormState, formData: data, dumpdata: data };
      return { ...state, [form]: initialFormState };
    }
    default:
      return state;
  }
}
