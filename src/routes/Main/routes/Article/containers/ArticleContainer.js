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

export const initLoader = [{
  action: loadArticle,
  getParams: (store) => {
    const pathname = store.getState().router.location.pathname.split('/');
    return [pathname[pathname.length - 1]];
  }, // pathname is same with url params
}];

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
