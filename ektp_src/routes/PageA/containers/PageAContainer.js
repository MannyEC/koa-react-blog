import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageA from '../components/PageAComponent';
import {
  loadPost,
} from '../modules/actions';

const mapStateToProps = state => ({
  posts: state.PageA.posts,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadPost
  },
  dispatch
);

export const initLoader = [
  (store) => store.dispatch(loadPost())
];

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PageA);
