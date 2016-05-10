var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {

  devtool: 'inline-source-map',
  devServer: { historyApiFallback: true },

  entry: './app/app.js',

  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [
      {
      	test: /\.js$/, 
      	exclude: /node_modules/, 
      	loader: 'babel'
      },
      {
      	test: /\.css$/,
      	loader: 'style!css'
      }
    ]
  },

  resolve: {
    alias: {
      // 'react-router': path.join(__dirname, 'node_modules/react-router/modules')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}
