import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { load, login, logout, clearExpiredError, getImageVerificationCode, checkImageVerificationCode } from 'redux/modules/auth/actions';
import Login from '../components/Login';


const mapStateToProps = state => ({
  error: state.auth.error,
  needImageVerification: state.auth.needImageVerification,
  imageVerification: state.auth.imageVerification
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      load,
      login,
      logout,
      clearExpiredError,
      getImageVerificationCode,
      checkImageVerificationCode
    },
    dispatch
  );

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params }) => {
      const actionParams = {
      };
      return actionParams;
    },
    mapActions: {
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
