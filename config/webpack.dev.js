const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    entry: [
        'react-hot-loader/patch',
        './src/index.tsx',
    ],

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        }),
        new webpack.HotModuleReplacementPlugin(),
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
