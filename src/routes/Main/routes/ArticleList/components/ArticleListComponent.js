import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import classes from './ArticleList.scss';

const renderList = (datas) => {
  const ret = [];
  datas.forEach((data, index) => {
    ret.push(
      <div className={classes.articleCard} key={index.toString()}>
        <div className={classes.articleCardDoc}>
          <header className={classes.articleCardHeader}>
            {data.title}
          </header>
          <div className={classes.articleCardContent}>
            {data.desc}
          </div>
          <div className={classes.articleCardTime}>
            {data.date}
          </div>
        </div>
        <div className={classes.articleCardLink}>
          <Link to={`/main/article/${data.filename}`}>
            <div type="right" theme="outlined" />
          </Link>
        </div>
      </div>
    );
  });
  return ret;
};

class ArticleList extends Component {
  componentWillMount() {
    const { loadArticleList } = this.props;
    loadArticleList();
  }

  render() {
    const { articleList } = this.props;
    const artList = renderList(articleList);
    return (
      <div className={classes.articleList}>
        {artList}
      </div>
    );
  }
}


export default ArticleList;
