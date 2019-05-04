import { mapValues, forIn, cloneDeep, pickBy } from 'lodash';
import { Form } from 'antd';
import PropTypes from 'prop-types';

export const getFieldError = (key, errors) => {
  if (errors && errors[key] !== undefined) {
    return {
      validateStatus: 'error',
      help: errors[key][0]
    };
  }
  return '';
};

export const mapPropsToFields = props => mapValues(props.formData, value => Form.createFormField({ value }));

export const onFieldChange = (props, fields) => {
  forIn(fields, v => props.onChange(v.name, v.value));
};

export const handleFormFieldsChange = (state, action, target) => {
  const { key, value } = action.payload;
  const cloneData = cloneDeep(state[target]);
  cloneData[key] = value;
  return { ...state, [target]: cloneData };
};

export const getSimpleFormValues = (state, form) => {
  const targetForm = state.SimpleForm[form];
  const formData = targetForm ? targetForm.formData : {};
  return pickBy(formData, value => value !== null);
};

export const antdFormShape = PropTypes.shape({
  getFieldProps: PropTypes.func
});
