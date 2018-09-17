import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Icon } from 'antd';
import classNames from 'classnames';
import Progress from 'components/Progress';
import classes from './Article.scss';
import ReactMarkdown from 'react-markdown';
import test from 'posts/test';

class Article extends Component {

  render() {
    return (
      <div className={classes.container}>
        <div><ReactMarkdown source={test}/></div>
      </div>

    );
  }
}


export default Article;
