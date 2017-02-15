var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/app.js",
  output: {
    path: "./public",
    filename: "bundle.min.js"
  },
  module:{
    loaders:[
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-0'],
          plugins: ['react-html-attrs','transform-class-properties','transform-decorators-legacy']
        }
      },
      {
        test: /\.s?css/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: debug ? [
    new ExtractTextPlugin('styles.css',{
      allChunks: true
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin('styles.css',{
      allChunks: true
    })
  ]
};