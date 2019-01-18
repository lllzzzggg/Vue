const env = process.env.NODE_ENV

module.exports = {
  baseUrl: '/',
  pages: {
    'reach': {
      entry: 'src/entries/reach/main.js',
      template: 'src/entries/reach/reach.html',
      chunks: ['chunk-vendors', 'chunk-common', 'reach']
    }
  },
  productionSourceMap: env === 'deployment',
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/reach/, to: '/reach.html' }
      ]
    }
  }
}
