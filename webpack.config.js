var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var cssExtractor = new ExtractTextPlugin('css/antd.min.css');

module.exports = {
  entry:[
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    path.resolve(__dirname,'app/main.js'),
  ],
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'bundle.js',
  },
  module: {
    loaders: [
      {
        test:/\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      title:"react antd",
      chunks: ["index"],
      template: "./index.html"
    }),
    cssExtractor,
  ]
};
