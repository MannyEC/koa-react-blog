import {
  isString,
  isArray,
  isPlainObject,
  isEmpty,
  noop,
  pick,
  mapValues,
  forIn,
  omit,
  defaultTo,
  reduce
} from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import invariant from 'invariant';
import { changeFormFields } from 'redux/modules/SimpleForm/actions';

const createForm = Form.create;

const getFieldError = (key, errors) => {
  const matchKeys = isString(key) ? [key] : key;

  if (!errors) {
    return '';
  }

  const help = reduce(matchKeys, (msg, value, key) => {
    if (errors[value] !== undefined) {
      const error = isString(errors[value]) ? [errors[value]] : errors[value];
      return msg + error[0];
    }
    return msg;
  }, '');

  return help === '' ? help : { validateStatus: 'error', help };
};

/**
 * Compose redux and antd form warpper.
 */
const DecoderComponent = ComposedComponent => class extends Component {
  static defaultProps = {
    targetForm: {
      formData: {},
      errors: {}
    },
    onSubmit: noop
  };

  static propTypes = {
    targetForm: PropTypes.shape({
      formData: PropTypes.object,
      errors: PropTypes.object
    }),
    onSubmit: PropTypes.func
  };

  render() {
    return (
      <ComposedComponent
        {...omit(this.props, ['targetForm'])}
        errors={this.props.targetForm.errors}
        getFieldError={getFieldError}
        handleSubmit={this.props.onSubmit(this.props.targetForm.formData)}
      />
    );
  }
};

export default (config) => {
  const { form } = config;

  invariant(form, '"form" is undefined, but it required when use SimpleForm');

  const parse = defaultTo(config.parse, value => value);
  const format = defaultTo(config.format, v => pick(v, ['name', 'value']));

  /**
   * Redux connect functions
   */
  const mapStateToProps = state => ({
    targetForm: state.SimpleForm[form]
  });
  const mapDispatchToProps = dispatch => ({
    onChange: (key, value) => dispatch(changeFormFields(key, value, form))
  });
  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const defaultStateProps = stateProps.targetForm
      ? {}
      : {
        targetForm: {
          formData: {},
          errors: {}
        }
      };
    return Object.assign(
      {},
      ownProps,
      stateProps,
      dispatchProps,
      defaultStateProps
    );
  };

  /**
   * Antd Form create functions
   */
  const mapPropsToFields = props =>
    mapValues(parse(props.targetForm.formData), value => Form.createFormField({ value }));
  const onFieldsChange = (props, fields) => {
    forIn(fields, (v, k) => {
      const formatField = format(v, k, props.targetForm.formData);
      if (isPlainObject(formatField)) {
        const { name, value } = formatField;
        props.onChange(name, value);
      } else if (isArray(formatField)) {
        formatField.forEach(({ name, value }) => props.onChange(name, value));
      }
    });
  };

  return compose(
    connect(mapStateToProps, mapDispatchToProps, mergeProps),
    createForm({ mapPropsToFields, onFieldsChange }),
    DecoderComponent
  );
};
