import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    label: 'JavaScript',
    value: 'js',
  }, {
    label: 'CSS',
    value: 'css',
  }, {
    label: 'HTML',
    value: 'HTML',
  }, {
    label: 'Python',
    value: 'python',
  }, {
    label: 'React',
    value: 'react',
  }, {
    label: 'algorithm',
    value: 'algorithm',
  }, {
    label: 'others',
    value: 'other',
  }]
}, {
  label: 'Life',
  value: 'life',
  children: [{
    label: '杂记',
    value: 'essay',
  }, {
    label: '元宝宝&Eason',
    value: 'pets',
  }, {
    label: 'About Me',
    value: 'me',
  }]
}];

class ExpandMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0,
    };
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.onHeaderSubItemClick = this.onHeaderSubItemClick.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  onHeaderClick(idx, value) {
    const { history: { push } } = this.props;
    this.setState({ selectIndex: idx });
    push(`/main/articleList/${value}`);
  }

  onHeaderSubItemClick(subval) {
    const { selectIndex } = this.state;
    const { history: { push } } = this.props;
    push(`/main/articleList/${menuList[selectIndex].value}/${subval}`);
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
          <a
            className={classes.menuText}
            onClick={() => this.onHeaderClick(index, item.value)}
          >
            {item.label}
          </a>
        </div>
      );

      const { children } = item;
      const tmpMenuItem = [];
      children.forEach((sub, idx) => {
        tmpMenuItem.push(
          <div
            key={idx.toString()}
            style={colorfulStyle(idx)}
            className={classes.subMenuItem}
            onClick={() => this.onHeaderSubItemClick(sub.value)}
          >
            {sub.label}
          </div>
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
    const { selectIndex } = this.state;
    const menus = this.renderMenu(menuList);
    return (
      <div className={classes.expandMenu}>
        <div className={classes.expandMenuHeaderBar}>
          {menus.headerSection}
        </div>
        <div className={classes.expandMenuContent}>
          {menus.subSection[selectIndex]}
        </div>
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
          <div className={classes.logo}>
            eckid
            <img
              className={classes.easonLogo}
              alt="eason"
              src="/img/eason.png"
            />
          </div>
          <div className={classes.expandMenu}>
            <ExpandMenu {...this.props} />
          </div>
        </header>
        <div className={classes.pageContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
