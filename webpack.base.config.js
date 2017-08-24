/**
 * Created by sargis on 6/9/17.
 */

import webpack from 'webpack'
import path from 'path'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import packagejson from './package.json'

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'src/phaser.js')

export default new Config().merge({
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: ['phaser']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'/* chunkName= */,
      filename: 'vendor.bundle.js'/* filename= */
    }),

    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      hash: true,
      title: packagejson.name,
      version: packagejson.version
    }),

    new CopyWebpackPlugin([
      {
        from: 'assets', to: 'assets'
      }
    ])

  ],

  module: {
    rules: [
      {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')}
    ]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  resolve: {
    alias: {
      'phaser': phaser
    }
  }
})
