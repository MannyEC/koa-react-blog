import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import classNames from 'classnames';
import classes from './EditCover.scss';

export default class EditCover extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    dashboard: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    layout: PropTypes.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    mode: PropTypes.string
  }

  static defaultProps = {
    dashboard: 0,
    layout: 0,
    mode: 'show'
  }

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.setHover = this.setHover.bind(this);
  }

  setHover = (event, hover) => {
    event.stopPropagation();
    this.setState({
      hover
    });
  }

  render() {
    const {
      children,
      dashboard,
      layout, mode
    } = this.props;
    return (
      <div
        className={classNames({
          [classes.container]: true,
          [classes.hover]: this.state.hover && mode === 'edit'
        })}
        onMouseEnter={event => this.setHover(event, true)}
        onMouseLeave={event => this.setHover(event, false)}
      >
        <div className={classes.content}>
          {children}
        </div>
        {this.state.hover && mode === 'edit' && <div
          className={classes.mask}
        >
          <Link to={`/largescreen/edit/${dashboard}/${layout}`} className={classes.editText}>
            <div className={classes.linkArea}>
              <Icon type="edit" className={classes.editIcon} />
              <br />
              <span>编辑数据</span>
            </div>
          </Link>
        </div>}
      </div>
    );
  }
}
