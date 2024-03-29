import path from "path";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new ReactRefreshPlugin(),
		new DotenvWebpackPlugin(),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		compress: true,
		port: 3001,
		hot: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
};
