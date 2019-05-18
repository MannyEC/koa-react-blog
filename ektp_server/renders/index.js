import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { matchPath } from 'react-router-dom';
import { RouterConfigs } from '../../ektp_src/routes';
import App from '../../ektp_src/routes';
import { layout } from './layout';
import getCreateStore from './store';

const getMatch = (routesArray, url) => {
  return routesArray.some(router => matchPath(url, {
    path: router.path,
    exact: router.exact,
  }));
};

export const render = async (ctx, next) => {
  const { store, history } = getCreateStore(ctx);
  // const branch = matchRoutes(router, ctx.req.url);
  const branch = [];
  const promises = branch.map(({ route }) => {
    const fetch = route.component.fetch;
    return fetch instanceof Function ? fetch(store) : Promise.resolve(null);
  });
  const dataLoader = RouterConfigs[0].loadData;
  console.log('-----------------------')
  const lf = dataLoader[0]
  lf(store).catch((err) => {
    console.log(err)
  })
  console.log(lf(store))

  await Promise.all(promises).catch((err) => {
    console.log(err);
  });
  // let isMatch = getMatch(router, ctx.req.url);
  let isMatch = true;
  if (!isMatch) {
    await next();
  } else {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={ctx.url}
          context={{}}
        >
          <App />
        </StaticRouter>
      </Provider>
    );

    const initState = store.getState();
    const body = layout(html, initState);
    ctx.body = body;
  }
};
