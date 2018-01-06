import * as path from 'path';
import * as webpack from 'webpack';
import commonConfig from './webpack.common';

const merge = require('webpack-merge');

const config: webpack.Configuration = merge(commonConfig, {
    entry: [
        './src/index.tsx',
    ],
    devtool: false,

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
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
                include: path.resolve(__dirname, '../src'),
            }
        ]
    }
});

export default config;
