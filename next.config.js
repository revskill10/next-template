process.traceDeprecation = true
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({extension: /\.mdx?$/})
const withOptimizedImages = require('next-optimized-images');
const withSize = require('next-size')
const withSass = require('@zeit/next-sass')
const withWorkers = require('@zeit/next-workers')
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline')
const withTypescript = require('@zeit/next-typescript')
const offlineOptions = require('./offline.config')
const webpack = require('./webpack.config')
const bundleAnalyzerConfig = require('./analyzer.config')
const publicRuntimeConfig = require('./env.config')
const exportPathMap = require('./export.config')
const analyzeServer = ['server', 'both'].includes(process.env.BUNDLE_ANALYZE)
const analyzeBrowser = ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE)
const pageExtensions = ['js', 'jsx', 'mdx']

const nextConfig = {
  ...offlineOptions,
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
  withOptimizedImages,
  withMDX,
  withSass,
  withCSS,
  withBundleAnalyzer,
]
module.exports = withPlugins(
  plugins,
  nextConfig
)
