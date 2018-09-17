import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { push } from 'react-router-redux';
import withFormProvider from 'providers/withFormProvider';
import withMessage from 'providers/withMessageProvider';
import { LARGESCREEN_DASHBOARD_NAME_FORM } from '../module/constants';
import {
  initDashboardNameForm,
  modDashboardName,
  loadDashboard,
  loadDashboardModules,
  deployDashboard,
  clearDashboard
} from '../module/actions';
import LargeScreen from '../components/LargeScreen';


const mapStateToProps = state => ({
  dashboard: state.LargeScreen.dashboard,
  modules: state.LargeScreen.dashboardModules
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      initDashboardNameForm,
      modDashboardName,
      loadDashboard,
      loadDashboardModules,
      deployDashboard
    },
    dispatch
  );

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params, dispatch }) => {
      const promises = [];
      promises.push(dispatch(clearDashboard()));
      promises.push(dispatch(loadDashboard(params.editKey)));
      promises.push(dispatch(loadDashboardModules(params.editKey)));
      return Promise.all(promises);
    }
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withMessage,
  withFormProvider({
    form: LARGESCREEN_DASHBOARD_NAME_FORM
  })
)(LargeScreen);

