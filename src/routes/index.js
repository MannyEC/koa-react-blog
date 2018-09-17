import 'moment/locale/zh-cn';
import 'theme/antd.overrides.less';
import 'theme/iconfont.less';
import 'theme/core.scss';

import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncProvider from 'providers/asyncProvider';
import { message } from 'antd';
import { load as getLogin } from 'redux/modules/auth/actions';

import MainContainer from './Main';
import LoginContainer from './Login';
import NotFound from './NotFound';
import LargeScreen, { largeScreenReducer } from './LargeScreen';

export const rootReducer = {
  ...largeScreenReducer
};

const antdMessageConfig = () => {
  message.config({
    duration: 2
  });
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

class ApplicationContainer extends React.Component {
  componentDidMount() {
    antdMessageConfig();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/main/:mainKey" component={MainContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/largescreen/:type" component={LargeScreen} />
        <Route path="/largescreen/:type/:editKey" component={LargeScreen} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default compose(
  withRouter,
  asyncProvider({
    async: ({ state, params }) => {
    },
    mapActions: {
      getLogin
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(ApplicationContainer);
