import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { push } from 'react-router-redux';
import { loadDashboard } from '../module/actions';
import Deploy from '../components/Deploy';


const mapStateToProps = state => ({
  dashboard: state.LargeScreen.dashboard
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      loadDashboard
    },
    dispatch
  );

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params, dispatch }) => {
      const promises = [];
      promises.push(dispatch(loadDashboard(params.editKey)));
      return Promise.all(promises);
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Deploy);

