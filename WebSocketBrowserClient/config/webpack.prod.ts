import * as webpack from 'webpack';
import commonConfig from './webpack.common';

const merge = require('webpack-merge');

const config: webpack.Configuration = merge(commonConfig, {
    devtool: false,

    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: 'prod' }
        })
    ]
});

export default config;
