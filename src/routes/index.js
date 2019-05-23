import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import MainContainer, { mainReducer, mainRouterConfigs } from './Main';

export const rootReducer = {
  ...mainReducer,
};

const mapStateToProps = state => ({
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

export const RouterConfigs = [{
  path: '/main/:mainKey',
  component: MainContainer,
  loadData: [],
  routes: mainRouterConfigs
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
