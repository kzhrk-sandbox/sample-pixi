import webpack from 'webpack';
import path from 'path';

const DEBUG = process.argv.includes('-d');

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

	plugins: (()=>{
    const result = [];

    result.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }));

    if (!DEBUG) {
      result.push(new webpack.optimize.UglifyJsPlugin());
    }

    return result;
  })()
}