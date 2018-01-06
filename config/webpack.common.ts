import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const config: webpack.Configuration = {
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        new CommonsChunkPlugin({
            name: 'vendors',
            minChunks: (module: any) => (
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

export default config;
