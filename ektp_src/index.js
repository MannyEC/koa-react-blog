import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import store, { history } from './redux/store';
import RootRoute from './routes';

const MOUNT_NODE = document.querySelector('#root');

let RootRender = (RootRoutes) => {
  render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <RootRoutes />
      </BrowserRouter>
    </Provider>,
    MOUNT_NODE
  );
};

RootRender(RootRoute);
// // Enable HMR and catch runtime errors in RedBox
// // This code is excluded from production bundle
// if (__DEV__ && module.hot) {
//   const RenderApp = RootRender;
//   const RenderError = (error) => {
//     const RedBox = require('redbox-react');
//     render(<RedBox error={error} />, MOUNT_NODE);
//   };
//   RootRender = (RootRoute) => {
//     try {
//       RenderApp(RootRoute);
//     } catch (error) {
//       RenderError(error);
//     }
//   };
// }
