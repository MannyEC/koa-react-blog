import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { push } from 'connected-react-router';
import { loadArticleList } from '../modules/actions';
import ArticleList from '../components/ArticleListComponent';


const mapStateToProps = state => ({
  articleList: state.ArticleList.articleList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      loadArticleList,
    },
    dispatch
  );

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params, dispatch }) => {
      const promises = [];
      promises.push(dispatch(loadArticleList()));
      return Promise.all(promises);
    }
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ArticleList);
