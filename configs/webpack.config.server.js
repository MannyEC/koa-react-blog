const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.base.js');

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: [
    '@babel/polyfill',
    'react',
    'react-dom',
    path.resolve(__dirname, '../server/index.js')
  ], // TODO: use configs/path
  output: {
    filename: 'bundle.js', // TODO: use configs/path
    path: path.resolve(__dirname, '../site') // TODO: use configs/path
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.css?$/,
      use: ['isomorphic-style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]_[local]_[hash:base64:5]'
        }
      }]
    }, {
      test: /\.(png|jpeg|jpg|gif|svg)?$/,
      loader: 'url-loader',
      options: {
        limit: 8000,
        outputPath: '../public/',
        publicPath: '/'
      }
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
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]_[local]_[hash:base64:5]'
        }
      }, {
        loader: "sass-loader" // 将 Sass 编译成 CSS
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ]
};

module.exports = merge(config, serverConfig);
