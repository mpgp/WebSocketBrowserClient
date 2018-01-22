const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.common');

const DEFINITIONS = {
    NODE_ENV: 'production',
    API_PATH: '/api/',
    WEBSOCKET_PATH: 'consoleappsample'
};

module.exports = merge(commonConfig, {
    entry: [
        './src/index.tsx'
    ],
    devtool: false,

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.DefinePlugin(Object.keys(DEFINITIONS).reduce((prev, cur) => {
            prev['process.env.' + cur] = JSON.stringify(DEFINITIONS[cur]);
            return prev;
        }, {})),
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
