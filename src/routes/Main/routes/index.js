import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ArticleContainer from './Article';
import ArticleListContainer from './ArticleList';
import DashboardsContainer from './Dashboards';
import CreateDashboardContainer from './CreateDashboard';

function MainRoutes(props) {
  return (
    <Switch>
      <Route path="/main/index" component={ArticleListContainer} />
      <Route path="/main/article" component={ArticleContainer} />
      <Route path="/main/create/dashboard" component={CreateDashboardContainer} />
      <Route path="/main/create/dashboard" component={CreateDashboardContainer} />
      <Redirect to="/main/index" />
    </Switch>
  );
}

export default MainRoutes;
