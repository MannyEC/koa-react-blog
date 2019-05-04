import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { push } from 'react-router-redux';
import Main from '../components/Main';


const mapStateToProps = state => ({
  loading: state.Loading.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Main);

