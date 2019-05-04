import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ArticleContainer, Article } from './Article';
import { ArticleListContainer, ArticleList } from './ArticleList';

export const mainrouterReducer = {
  ArticleList,
  Article,
};

function MainRoutes(props) {
  return (
    <Switch>
      <Route path="/main/index" component={ArticleListContainer} />
      <Route path="/main/article/:articleId" component={ArticleContainer} />
      <Redirect to="/main/index" />
    </Switch>
  );
}

export default MainRoutes;
