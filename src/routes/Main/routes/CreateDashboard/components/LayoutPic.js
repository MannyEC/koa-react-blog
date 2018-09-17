import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './LayoutPic.scss';

export default class LayoutPic extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    template: PropTypes.object
  }

  static defaultProps = {
    checked: false,
    template: {
      id: 1,
      templateType: 'template1',
      layoutPic: '',
      thumbnail: ''
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { template } = this.props;
    return (
      <div
        className={classNames({
          [classes.container]: true,
          [classes.checked]: this.props.checked
        })}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <img
          src={this.state.hover ? template.thumb : template.layout_thumb}
          alt={this.state.hover ? '大屏缩略图' : '布局缩略图'}
        />
      </div>
    );
  }
}
