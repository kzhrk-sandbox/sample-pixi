import webpack from 'webpack';
import path from 'path';

export default {
	entry: {
		main: './src/webpack/js/main.js',
		vendor: ['pixi.js', 'hammerjs']
	},

	output: {
		path: path.resolve(__dirname, './public/js'),
		filename: '[name].bundle.js'
	},

	resolve: {
		extensions: ['.js']
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: "babel-loader"
				}]
			}
		]
	},

	plugins: [
    new webpack.optimize.CommonsChunkPlugin({
    	name: 'vendor',
			minChunks: Infinity
    }),
		new webpack.optimize.UglifyJsPlugin()
	]
}