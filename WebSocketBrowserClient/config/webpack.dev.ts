import * as webpack from 'webpack';
import commonConfig from './webpack.common';

const merge = require('webpack-merge');

const config: webpack.Configuration = merge(commonConfig, {
    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: 'dev' }
        })
    ],

    devServer: {
        hot: true,
        disableHostCheck: true
    }

});

export default config;
