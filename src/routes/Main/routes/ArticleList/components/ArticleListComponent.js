import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    this.state = {
      page: 1,
    };
    this.loadData = this.loadData.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const { page } = this.state;
    this.loadData(location.pathname, page);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.location.pathname !== this.props.location.pathname) {
      this.setState({ page: 1 });
      this.loadData(nextProp.location.pathname, 1);
    }
  }

  loadData(pathname, page) {
    const { loadArticleList } = this.props;
    const url = pathname.split('/');
    const cls = url.length > 3 ? url[3] : undefined;
    const tag = url.length > 4 ? url[4] : undefined;
    loadArticleList(cls, tag, page);
  }

  pageChange(page) {
    const { location } = this.props;
    if (page < 1) {
      return false;
    }
    this.setState({ page });
    this.loadData(location.pathname, page);
    return;
  }

  render() {
    const { articleList, count } = this.props;
    const { page } = this.state;
    const artList = renderList(articleList);
    return (
      <div className={classes.container}>
        <div className={classes.articleList}>
          {artList}
        </div>
        <section className={classes.articlePageSection}>
          <div className={classes.articlePageBtnContainer}>
            {page > 1 && (
              <button
                type="button"
                onClick={() => this.pageChange(page - 1)}
              >
                BEFORE
              </button>
            )}
          </div>
          <div className={classes.articleCount}>{`共 ${count} 篇`}</div>
          <div className={classes.articlePageBtnContainer} style={{ textAlign: 'end' }}>
            {(page * 10 < count) && (
              <button
                type="button"
                onClick={() => this.pageChange(page + 1)}
              >
                NEXT
              </button>
            )}
          </div>
        </section>
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
