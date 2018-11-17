const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (config, options) => {
  config.node = {
    fs: 'empty'
  }
  config.module.rules.push({
    test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'raw-loader',
  });
  config.module.rules.push({
    test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
    use: {
      loader: 'url-loader',
      options: {
        limit: 8192,
        publicPath: './',
        outputPath: 'static/css/',
        name: '[name].[ext]'
      }
    }
  })
 
  if (config.mode === 'production') {
    if (Array.isArray(config.optimization.minimizer)) {
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    }
  }

  if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config
}