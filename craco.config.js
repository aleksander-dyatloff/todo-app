const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@redux': path.resolve(__dirname, 'src/redux/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@src': path.resolve(__dirname, 'src/'),
      '@icons': path.resolve(__dirname, 'src/icon-components/'),
    }
  }
}