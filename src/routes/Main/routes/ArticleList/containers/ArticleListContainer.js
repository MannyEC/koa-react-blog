import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { loadArticleList } from '../modules/actions';
import ArticleList from '../components/ArticleListComponent';

const mapStateToProps = state => ({
  articleList: state.ArticleList.articleList,
  count: state.ArticleList.count,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      loadArticleList,
    },
    dispatch
  );

export const initLoader = [{
  action: loadArticleList,
  getParams: null,
}];

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ArticleList);
