const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve:{
        modules:[
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"style.css"
        })
    ],
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}