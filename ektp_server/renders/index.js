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

const getLoader = (RouterConfigs, url) => {
  const loader = [];
  RouterConfigs.forEach((routerConf) => {
    if (routerConf.path === url) {
      if (!routerConf.loadData) return false;
      routerConf.loadData.forEach((item) => {
        loader.push(item);
      });
      // const childLoader = getLoader(routerConf.routes, url);
    }
  });
  return loader;
};

export const render = async (ctx, next) => {
  const { store, history } = getCreateStore(ctx);

  const loaders = getLoader(RouterConfigs, ctx.req.url);
  await Promise.all(loaders.map(async (loader) => {
    const contents = await loader(store);
  }));

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
