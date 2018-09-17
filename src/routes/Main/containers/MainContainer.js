import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { push } from 'react-router-redux';
import { load as getLogin, logout } from 'redux/modules/auth/actions';
import { loadDashboards } from 'redux/modules/Dashboards/actions';
import { cleanError, cleanPermissionDenide } from 'redux/modules/GlobalTips/actions';
import Main from '../components/Main';


const mapStateToProps = state => ({
  loading: state.Loading.loading,
  loginUser: state.auth.user,
  globalErrors: state.GlobalTips.errors,
  permissionDenide: state.GlobalTips.warning,
  dashboards: state.Dashboards.dashboards
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      cleanError,
      push,
      cleanPermissionDenide,
      loadDashboards
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Main);

