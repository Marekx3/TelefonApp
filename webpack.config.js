var path = require('path');

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "main.js",
		path: __dirname + "/dist"
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/, loader: "awesome-typescript-loader",
			}]

	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [
			".ts",
			".tsx",
			".js",
			".json"
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	devServer: {
		port: 3001,
		contentBase: path.join(__dirname, 'public')

	}
}