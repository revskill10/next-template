const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html'
    }
  },
  webpack: (config) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )
    config.node = {
      fs: 'empty'
    }
    return config
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    }
  }
}

module.exports = withBundleAnalyzer(nextConfig)
