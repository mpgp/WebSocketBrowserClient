const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].js',
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        new CommonsChunkPlugin({
            name: 'vendors',
            minChunks: (module) => (
                typeof module.context === 'string' && module.context.indexOf('node_modules') !== -1
            )}),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Multiplayer Game Platform',
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, '../src/index.ejs')
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    }

};
