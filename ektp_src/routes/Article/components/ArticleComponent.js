import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import classes from './Article.scss';
import ReactMarkdown from 'react-markdown';

class Article extends Component {
  render() {
    const { article } = this.props;
    return (
      <div className={classes.container}>
        <div><ReactMarkdown source={article} /></div>
      </div>
    );
  }
}

export default Article;