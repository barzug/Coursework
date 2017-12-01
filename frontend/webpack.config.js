'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    context: __dirname,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    entry: './app/application.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader'
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('./bundle.css')
    ]
};