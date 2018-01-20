const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.common');

const NODE_ENV = 'production';
const API_PATH = '/api/';

module.exports = merge(commonConfig, {
    entry: [
        './src/index.tsx'
    ],
    devtool: false,

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.API_PATH': JSON.stringify(API_PATH)
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.tsx?$/,
                use: [
                    'awesome-typescript-loader'
                ],
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.resolve(__dirname, '../src')
            }
        ]
    }
});
