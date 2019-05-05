/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path');
const debug = require('debug');
const { argv } = require('yargs');
const ip = require('ip');
require('colors');

const localip = ip.address();
const newDebug = debug('app:config');

newDebug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',
  app: process.env.APP || 'main',
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'tests',
  api_server: process.env.API_HOST || 'localhost',
  api_port: process.env.API_PORT || 8080,
  protocol: process.env.PROTOCOL || 'http',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: localip, // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules: true,
  compiler_devtool: 'cheap-module-eval-source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
    children: false
  },
  compiler_vendor: [
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env)
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __DEBUG__: config.env === 'development' && !argv.no_debug,
  __COVERAGE__: !argv.watch && config.env === 'test',
  __BASENAME__: JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    newDebug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    );
  });

// ------------------------------------
// Utilities
// ------------------------------------
const { resolve } = path;
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args]);

config.utils_paths = {
  base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
};


// ========================================================
// Environment Configuration
// ========================================================
newDebug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments');

const overrides = environments[config.env];
if (overrides) {
  newDebug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config));
} else {
  newDebug('No environment overrides found, defaults will be used.');
}

module.exports = config;
