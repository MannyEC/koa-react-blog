const Koa = require('koa');
const convert = require('koa-convert');
const webpack = require('webpack');
const historyApiFallback = require('koa-connect-history-api-fallback');
const serve = require('koa-static');
const proxy = require('koa-proxy');
const debug = require('debug');
const config = require('../config');
const webpackDevMiddleware = require('./middleware/webpack-dev');
const webpackHMRMiddleware = require('./middleware/webpack-hmr');
const portalWebpackConfig = require('../build/webpack.config.portal');
const devWebpackConfig = require('../build/webpack.config.dev');

const newDebug = debug('app:server');
const paths = config.utils_paths;
const app = new Koa();

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)));

  const host = config.proxy.options.host;

  // 直接 match static resource from server
  app.use(proxy({
    host,
    match: /^\/images\/*/
  }));
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  let webpackConfig = devWebpackConfig;
  if (config.app === 'portal') {
    webpackConfig = portalWebpackConfig;
  }
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))));
} else {
  newDebug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(convert(serve(paths.dist())));
}

module.exports = app;
