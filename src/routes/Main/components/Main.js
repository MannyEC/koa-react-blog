import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Spin, notification, Badge, Avatar } from 'antd';
import classNames from 'classnames';

import classes from './Main.scss';

const colorfulStyle = (index) => {
  const colors = [
    '#BB92D7', '#00A3B7', '#00B6BD',
    '#FF91A6', '#A49BC2', '#ED805F',
    '#00BD88', '#239FE1', '#EF4B70',
    '#F65D4B', '#ECBB6E', '#7E859A',
  ];
  return {
    color: colors[index],
    borderBottom: `1px solid ${colors[index]}`,
    fontSize: 20,
    marginRight: 10,
    width: '300px',
    fontWeight: 800,
  };
};

const menuList = [{
  label: 'blog',
  value: 'blog',
  children: [{
    label: '前端',
    value: 'frontend',
  }, {
    label: 'JavaScript',
    value: 'genres',
  }, {
    label: 'CSS',
    value: 'genres',
  }, {
    label: 'Python',
    value: 'genres',
  }, {
    label: 'React',
    value: 'genres',
  }, {
    label: 'React native',
    value: 'genres',
  }, {
    label: 'network',
    value: 'genres',
  }, {
    label: 'algorithm',
    value: 'genres',
  }]
}, {
  label: 'Think & Life',
  value: 'think',
  children: [{
    label: '随笔',
    value: 'genres',
  }, {
    label: '技术思考',
    value: 'genres',
  }, {
    label: '译文',
    value: 'genres',
  }]
}, {
  label: 'About',
  value: 'about',
  children: [{
    label: '关于我',
    value: 'genres',
  }]
}];

class ExpandMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStatus: true,
      selectIndex: 0,
    };
  }

  onHeaderClick(idx) {
    const { selectIndex, openStatus } = this.state;
    if (selectIndex === idx) {
      this.setState({ openStatus: !openStatus });
    } else {
      this.setState({ selectIndex: idx, openStatus: true });
    }
  }

  renderMenu(configs) {
    const { selectIndex } = this.state;
    const headerSection = [];
    const subSection = [];

    configs.forEach((item, index) => {
      headerSection.push(
        <div
          key={index.toString()}
          className={classNames({
            [classes.expandMenuBarItem]: true,
            [classes.expandMenuBarItemSelected]: selectIndex === index,
          })}
        >
          <a className={classes.menuText} onClick={() => this.onHeaderClick(index)}>
            {item.label}
          </a>
        </div>
      );

      const { children } = item;
      const tmpMenuItem = [];
      children.forEach((sub, idx) => {
        tmpMenuItem.push(
          <div key={idx.toString()} style={colorfulStyle(idx)}>{sub.label}</div>
        );
      });
      subSection.push(tmpMenuItem);
    });

    return {
      headerSection,
      subSection
    };
  }

  render() {
    const { openStatus, selectIndex } = this.state;
    const menus = this.renderMenu(menuList);
    console.log(menus)
    return (
      <div className={classes.expandMenu}>
        <div className={classes.expandMenuHeaderBar}>
          {menus.headerSection}
        </div>
        {openStatus && (
          <div className={classes.expandMenuContent}>
            {menus.subSection[selectIndex]}
          </div>
        )}
      </div>
    );
  }
}

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <div className={classes.logo}>eckid</div>
          <div>
            <ExpandMenu />
          </div>
        </header>
        <div className={classes.pageContent}>
          <div className={classes.navSection}>
            <div className={classes.navSectionAll}>归档(20)</div>
            <div className={classes.navSectionItem}>2018-09(1)</div>
            <div className={classes.navSectionItem}>2018-08(10)</div>
            <div className={classes.navSectionItem}>2018-07(4)</div>
            <div className={classes.navSectionItem}>2018-06(3)</div>
            <div className={classes.navSectionItem}>2018-05(2)</div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
