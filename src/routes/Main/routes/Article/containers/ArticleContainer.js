import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
// import asyncProvider from 'providers/asyncProvider';
import { loadArticle } from '../modules/actions';
import Article from '../components/ArticleComponent';

const mapStateToProps = state => ({
  article: state.Article.article,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      loadArticle,
    },
    dispatch
  );

export default compose(
  withRouter,
  // asyncProvider({
  //   async: ({ state, params, dispatch }) => {
  //     const promises = [];
  //     const postName = params.articleId;
  //     promises.push(dispatch(loadArticle(postName)));
  //     return Promise.all(promises);
  //   }
  // }),
  connect(mapStateToProps, mapDispatchToProps),
)(Article);
