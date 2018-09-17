import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string
};

class NsIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const clsName = `iconfont icon-${this.props.type}`;
    const className = undefined === this.props.className ? clsName : `${clsName} ${this.props.className}`;
    const classObj = {
      ...this.props,
      className
    };
    return (
      <i {...classObj} />
    );
  }
}

NsIcon.propTypes = propTypes;

export default NsIcon;
