import React from 'react';
import MainContainer from './containers/MainContainer';
import MainRoutes, { mainrouterReducer } from './routes';

export const mainReducer = {
  ...mainrouterReducer,
};

const Container = props => (
  <MainContainer>
    <MainRoutes {...props} />
  </MainContainer>);

export default Container;
