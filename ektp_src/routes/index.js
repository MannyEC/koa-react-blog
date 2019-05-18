import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import PageAContainer, { pageAReducer, PageAinitLoader } from './PageA';
import PageBContainer, { pageBReducer } from './PageB';

export const rootReducer = {
  ...pageAReducer,
  ...pageBReducer
};

const mapStateToProps = state => ({
  name: state.auth.name,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

const renderRoutes = (routes) => {
  const ret = [];
  routes.forEach((routeConfig, index) => {
    ret.push(
      <Route
        key={index.toString()}
        path={routeConfig.path}
        component={routeConfig.component}
      />
    );
  });
  return ret;
};

// 我想routerConfigs也可以向上级传递
export const RouterConfigs = [{
  path: '/main/rootA',
  component: PageAContainer,
  loadData: PageAinitLoader,
  routes: []
}, {
  path: '/main/rootB',
  component: PageBContainer,
  loadData: null,
  routes: []
}];

class ApplicationContainer extends React.Component {
  static propTypes = {
    language: PropTypes.string
  }

  render() {
    const routeCom = renderRoutes(RouterConfigs);
    return (
      <Switch>
        {routeCom}
      </Switch>
    );
  }
}

export default compose(
  hot(module),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ApplicationContainer);
