const path = require('path');

module.exports = {
  entry: './src/game.js',
  output: {
    filename: 'snake_game.bundle.js',
    path: path.resolve(__dirname, 'dist'),
	clean: true
  },
  module: {
	rules: [
		{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		},
		{
		  test: /\.(png|svg|jpe?g|gif|ogg|wav)$/i,
		  type: 'asset/resource',
		},
	 ]
  }
};