const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  publicRuntimeConfig: {
    FB_APP_ID: process.env.FB_APP_ID,
    FB_PAGE_ID: process.env.FB_PAGE_ID,
    USER_ROLE_ID: process.env.USER_ROLE_ID
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
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
  webpack: (config, options) => {
    config.node = {
      fs: 'empty'
    }
    config.module.rules.push({
      test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'raw-loader',
    });
   
    if (config.mode === 'production') {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
    }
    
    return config
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    }
  }
}

module.exports = withOptimizedImages(withMDX(withCSS(withBundleAnalyzer(nextConfig))))
