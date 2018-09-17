import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LargeScreenContainer from './containers/LargeScreenContainer';
import EditComponent from './containers/EditComponentContainer';
import Deploy from './containers/DeployContainer';
import LargeScreen from './module';

export const largeScreenReducer = {
  LargeScreen
};

const LargeScreenRoutes = props => (
  <Switch>
    <Route exact path="/largescreen/show/:editKey" component={LargeScreenContainer} />
    <Route exact path="/largescreen/show" component={LargeScreenContainer} />
    <Route exact path="/largescreen/edit/:dashboardKey/:layoutKey" component={EditComponent} />
    <Route exact path="/largescreen/deploy/:editKey" component={Deploy} />
    <Redirect to="/main/dashboards" />
  </Switch>
);

export default LargeScreenRoutes;
