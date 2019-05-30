import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import classes from './Article.scss';

class Article extends Component {
  componentWillMount() {
    const { loadArticle, match: { params: { articleId }} } = this.props;
    loadArticle(articleId);
  }

  render() {
    const { article } = this.props;
    return (
      <div className={classes.container}>
        <div><ReactMarkdown source={article} className={classes.markdownContainer} /></div>
      </div>
    );
  }
}

export default Article;
