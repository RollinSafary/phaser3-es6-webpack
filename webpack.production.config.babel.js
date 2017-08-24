import Config from 'webpack-config'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import { browserSyncPlugin, definePlugin } from './webpack.development.config.babel'

// the path(s) that should be cleaned
const pathsToClean = [
  'dist'
]

// the clean options to use
const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false
}

export default new Config().extend({
  'webpack.development.config.babel.js': config => {
    delete config.devtool
    delete config.output.pathinfo
    delete config.watch
    definePlugin.definitions['__DEV__'] = JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    const browserSyncPluginIndex = config.plugins.indexOf(browserSyncPlugin)
    if (browserSyncPluginIndex !== -1) {
      config.plugins.splice(browserSyncPluginIndex, 1)
    }
    return config
  }
}).merge({
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
})
