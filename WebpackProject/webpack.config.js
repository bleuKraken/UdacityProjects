const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  // I created this (:
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: '/\.js$/', // Looks for anything with a .js file extension
        exclude: /node_modules/,
        loader: "babel-loader" // Runs through this loader if it HAS the .js
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    })
  ]
}
