process.traceDeprecation = true
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({extension: /\.mdx?$/})
const withSize = require('next-size')
const withSass = require('@zeit/next-sass')
const withWorkers = require('@zeit/next-workers')
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline')
const withTypescript = require('@zeit/next-typescript')
const withLess = require('@zeit/next-less')

const lessOptions = require('./configs/less.config')
const offlineOptions = require('./configs/offline.config')
const webpack = require('./configs/webpack.config')
const bundleAnalyzerConfig = require('./configs/analyzer.config')
const publicRuntimeConfig = require('./configs/env.config')
const exportPathMap = require('./configs/export.config')
const workerOptions = require('./configs/worker.config')
const analyzeServer = ['server', 'both'].includes(process.env.BUNDLE_ANALYZE)
const analyzeBrowser = ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE)
const pageExtensions = ['js', 'jsx', 'mdx']

const nextConfig = {
  ...lessOptions,
  ...offlineOptions,
  ...workerOptions,
  publicRuntimeConfig,
  pageExtensions,
  analyzeServer,
  analyzeBrowser,
  bundleAnalyzerConfig,
  webpack,
  exportPathMap,
}

//module.exports = withWorkers(withOffline(withSize(withOptimizedImages(withMDX(withSass(withCSS(withBundleAnalyzer(nextConfig))))))))
const plugins = [
  withTypescript,
  withWorkers,
  withOffline,
  withSize,
  withMDX,
  withSass,
  withCSS,
  withLess,
  withBundleAnalyzer,
]
module.exports = withPlugins(
  plugins,
  nextConfig
)
