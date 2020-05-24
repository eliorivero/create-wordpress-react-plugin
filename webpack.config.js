const path = require( 'path' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const port = 3000;
const webpackConfig = {
	entry: {
		main: './app/index.js',
	},
	output: {
		path: path.join( __dirname, 'js' ),
		filename: 'scripts.js',
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js' ],
		modules: [ path.resolve( __dirname, 'app' ), 'node_modules' ],
		mainFiles: [ 'index' ],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			},
			{
				test: /\.js$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'development' === process.env.NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin( { filename: '../css/styles.css' } ),
	],
};

if ( 'development' === process.env.NODE_ENV ) {
	webpackConfig.mode = 'development';
	webpackConfig.entry = [ 'react-hot-loader/patch', './app/index.js' ];
	webpackConfig.output.publicPath = 'http://localhost:' + port + '/js';
	webpackConfig.devServer = {
		port,
		open: false,
		proxy: {
			'/wp-json/': 'http://localhost',
		},
		hot: true,
		inline: true,
      	headers: { "Access-Control-Allow-Origin": "*" }
	};
} else {
	webpackConfig.mode = 'production';
	webpackConfig.optimization = {
		minimizer: [ new OptimizeCSSAssetsPlugin( {} ), new TerserJSPlugin() ],
	};
}

module.exports = webpackConfig;
