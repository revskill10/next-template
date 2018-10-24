const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})

const nextConfig = {
  publicRuntimeConfig: {
    FB_APP_ID: process.env.FB_APP_ID,
    FB_PAGE_ID: process.env.FB_PAGE_ID,
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
  webpack: (config) => {
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

module.exports = withMDX(withCSS(withBundleAnalyzer(nextConfig)))
