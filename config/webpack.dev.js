const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

const DEFINITIONS = {
    NODE_ENV: 'dev',
    API_PATH: 'http://localhost:5000/api/',
    WEBSOCKET_PATH: 'consoleappsample'
};

module.exports = merge(commonConfig, {
    entry: [
        'react-hot-loader/patch',
        './src/index.tsx'
    ],

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin(Object.keys(DEFINITIONS).reduce((prev, cur) => {
            prev['process.env.' + cur] = JSON.stringify(DEFINITIONS[cur]);
            return prev;
        }, {})),
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
        disableHostCheck: true,
        historyApiFallback: true
    }

});
