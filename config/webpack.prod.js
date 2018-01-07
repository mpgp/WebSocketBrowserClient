const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

const NODE_ENV = 'production';
const API_PATH = '/api/';

module.exports = merge(commonConfig, {
    entry: [
        './src/index.tsx'
    ],
    devtool: false,

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.API_PATH': JSON.stringify(API_PATH)
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'awesome-typescript-loader'
                ],
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.resolve(__dirname, '../src')
            }
        ]
    }
});
