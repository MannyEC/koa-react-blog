import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import Main from '../components/Main';

const mapStateToProps = state => ({
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
