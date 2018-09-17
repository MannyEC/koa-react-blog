import React from 'react';
import MainContainer from './containers/MainContainer';
import MainRoutes from './routes';

const Container = props => (
  <MainContainer>
    <MainRoutes {...props} />
  </MainContainer>);

export default Container;
