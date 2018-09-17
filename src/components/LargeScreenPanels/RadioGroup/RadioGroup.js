import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import classes from './RadioGroup.scss';

const getActiveClass = (props, key) => {
  if (props.options.length === 3) {
    return className({
      [classes.radio]: true,
      [classes.activeLeft]: key === props.options[0].key && props.unit === props.options[0].key,
      [classes.activeMiddle]: key === props.options[1].key && props.unit === props.options[1].key,
      [classes.activeRight]: key === props.options[2].key && props.unit === props.options[2].key,
    });
  }
  if (props.options.length === 2) {
    return className({
      [classes.radio]: true,
      [classes.activeLeft]: key === props.options[0].key && props.unit === props.options[0].key,
      [classes.activeRight]: key === props.options[1].key && props.unit === props.options[1].key,
    });
  }
};

const onChange = (props, key) => {
  if (props.onChange) {
    props.onChange(key);
  }
};

const RadioGroup = props => (
  <div className={classes.container}>
    {props.options.map((option, idx) => (
      <div
        key={idx}
        className={getActiveClass(props, option.key)}
        onClick={() => onChange(props, option.key)}
      >
        <span>{option.value}</span>
      </div>
    ))}
  </div>
);

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }))
};

RadioGroup.defaultProps = {
  options: [{
    value: 'bps', key: 'bps'
  }, {
    value: 'pps', key: 'pps'
  }]
};

export default RadioGroup;
