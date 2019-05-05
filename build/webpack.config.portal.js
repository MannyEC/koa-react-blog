const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const debug = require('debug');
const config = require('../config');

const newDebug = debug('app:webpack:config');
const paths = config.utils_paths;

newDebug('Create configuration.');
const webpackConfig = {
  mode: 'development',
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    modules: [paths.client(), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------

const PORTAL_ENTRY_PATHS = [
  paths.client('portal.js')
];

webpackConfig.entry = {
  portal: PORTAL_ENTRY_PATHS.concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist(),
  publicPath: config.compiler_public_path
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('portal.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    chunksSortMode: 'dependency',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  }),
];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css-loader';

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
];

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (config.compiler_css_modules) {
  PATHS_TO_TREAT_AS_CSS_MODULES
    .push(paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&')); // eslint-disable-line
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);
// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;

webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  include: /src/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: [
      'transform-runtime',
      'transform-decorators-legacy',
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ]
    ],
    presets: ['env', 'react', 'stage-0']
  }
}, {
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader',
    'less-loader'
  ]
}, {
  test: /\.scss$/,
  exclude: excludeCSSModules,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
        ]
      }
    },
    { loader: 'sass-loader' }
  ]
}, {
  test: /\.css$/,
  exclude: excludeCSSModules,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
        ]
      }
    }
  ]
}, {
  test: /\.woff(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
}, {
  test: /\.woff2(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
}, {
  test: /\.otf(\?.*)?$/,
  loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
}, {
  test: /\.ttf(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
}, {
  test: /\.eot(\?.*)?$/,
  loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
}, {
  test: /\.svg(\?.*)?$/,
  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=500000&mimetype=image/svg+xml'
}, {
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader?limit=8192'
}];

// Don't split bundles during testing, since we only want import one bundle

webpackConfig.optimization = {
  splitChunks: {
    chunks: 'all',
    name: 'vendor',
  }
};


if (isUsingCSSModules) {
  const cssModulesLoader = `${BASE_CSS_LOADER}?${[
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')}`;
  webpackConfig.module.rules.push({
    test: /\.scss$/,
    include: cssModulesRegex,
    use: [
      { loader: 'style-loader' },
      { loader: cssModulesLoader },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
          ]
        }
      },
      { loader: 'sass-loader' }
    ]
  }, {
    test: /\.css$/,
    include: cssModulesRegex,
    use: [
      { loader: 'style-loader' },
      { loader: cssModulesLoader },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({ broswer: 'last 5 versions' }), // 处理CSS前缀问题，自动添加前缀
          ]
        }
      }
    ]
  });
}

newDebug('Enable plugins for live development (HMR, NoErrors).');
webpackConfig.plugins.push(
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);


module.exports = webpackConfig;
