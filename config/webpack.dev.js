const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

const NODE_ENV = 'dev';
const API_PATH = '/api/';

module.exports = merge(commonConfig, {
    entry: [
        'react-hot-loader/patch',
        './src/index.tsx'
    ],

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.API_PATH': JSON.stringify(API_PATH)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader'
                ],
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.resolve(__dirname, '../src'),
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    devServer: {
        hot: true,
        disableHostCheck: true
    }

});
