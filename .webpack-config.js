const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'VueCheck.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
