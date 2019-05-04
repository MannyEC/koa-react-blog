const fs = require('fs-extra');
const debug = require('debug');
const webpackCompiler = require('../build/webpack-compiler');
const webpackConfig = require('../build/webpack.config.prod');
const config = require('../config');

const newDebug = debug('app:bin:compile');
const paths = config.utils_paths;

(async function () {
  try {
    newDebug('Run compiler');
    const stats = await webpackCompiler(webpackConfig);
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      newDebug('Config set to fail on warning, exiting with status code "1".');
      process.exit(1);
    }
    newDebug('Copy static assets to dist folder.');
    fs.copySync(paths.client('static'), paths.dist());
  } catch (e) {
    newDebug('Compiler encountered an error.', e);
    process.exit(1);
  }
})();

