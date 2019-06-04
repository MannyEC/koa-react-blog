const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const debug = require('debug');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const newDebug = debug('app:webpack:config');
// const paths = config.utils_paths;

newDebug('Create configuration.');
const webpackConfig = {
  mode: 'production',
  name: 'client',
  target: 'web',
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: false,
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------

const APP_ENTRY_PATHS = [
  path.resolve(__dirname, '../src/index.js')
];

webpackConfig.entry = {
  'babel-polyfill': '@babel/polyfill',
  'react': 'react',
  'react-dom': 'react-dom',
  app: APP_ENTRY_PATHS,
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: '[name].eckidecho.js',
  path: path.resolve(__dirname, '../site'),
  // publicPath: config.compiler_public_path,
  globalObject: 'this'
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  // new BundleAnalyzerPlugin(),
];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
];

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;

const cssModulesRegex = [];

webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  include: /(\\|\/)src/,
  exclude: /\.worker\.js$/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    babelrc: true
  }
}, {
  // 匹配 *.worker.js
  test: /\.worker\.js$/,
  use: [{
    loader: 'worker-loader',
    options: {
      inline: true
    }
  }, {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: true
    }
  }]
}, {
  test: /\.less$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: {
        },
        javascriptEnabled: true,
      },
    }
  ]
}, {
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]_[local]_[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
        ]
      }
    },
    { loader: 'sass-loader' }
  ]
}, {
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')({ broswer: 'last 5 versions' }),
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

webpackConfig.optimization = {
  splitChunks: {
    chunks: 'all',
    name: 'vendor',
  },
  minimize: true
};

if (isUsingCSSModules) {
  const getCssModulesLoader = importLoaders => ({
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    }
  });
  webpackConfig.module.rules.push({
    test: /\.scss$/,
    include: cssModulesRegex,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: 'style-loader' },
      getCssModulesLoader(2),
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({ broswer: 'last 5 versions' }),
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
      getCssModulesLoader(1),
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('autoprefixer')({ broswer: 'last 5 versions' }),
          ]
        }
      }
    ]
  });
}

webpackConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }),
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(js|css)$'),
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: true
  })
);

module.exports = webpackConfig;
