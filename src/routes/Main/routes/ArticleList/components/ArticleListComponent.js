import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
            {data.descript}
          </div>
          <div className={classes.articleCardTime}>
            {data.date}
          </div>
        </div>
        <Link to={`/main/article/${data.filename}`} className={classes.articleCardLink}>
          GO
        </Link>
      </div>
    );
  });
  return ret;
};

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    this.loadData(location.pathname);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.location.pathname !== this.props.location.pathname) {
      this.loadData(nextProp.location.pathname);
    }
  }

  loadData(pathname) {
    const { loadArticleList } = this.props;
    const url = pathname.split('/');
    const cls = url.length > 3 ? url[3] : undefined;
    const tag = url.length > 4 ? url[4] : undefined;
    loadArticleList(cls, tag);
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

ArticleList.propTypes = {
  location: PropTypes.object,
  loadArticleList: PropTypes.func,
  articleList: PropTypes.array,
};

export default ArticleList;
