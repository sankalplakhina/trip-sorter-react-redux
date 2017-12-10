import path from 'path';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { webpackHost, webpackPort, reduxDevTools } from '../config/env';
import webpack from 'webpack';
import webpackIsomorphicToolsConfig from './webpack-isomorphic-tools';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

const webpackIsomorphicTools = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

module.exports = {
    devtool: 'inline-source-map', // use 'cheap-inline-source-map' for faster performance
    performance: {
            hints: false,
    },
    context: path.resolve('./'),
    entry: {
        main: [
            `webpack-hot-middleware/client?path=http://${webpackHost}:${webpackPort}/__webpack_hmr`,
            'src/less/styles.less', // entry point for styles
            'src/js/client.js',  // entry point for js
        ],
    },
    output: {
        path: path.resolve('public/assets'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: `http://${webpackHost}:${webpackPort}/assets/`,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        sourceMap: false, // disable babel sourcemaps to see the transpiled code when debugging
                        plugins: ['lodash'],
                    }
                }],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 1
                        }
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2
                            }
                        },
                        {
                          loader: "postcss-loader",
                          options: {
                            sourceMap: true,
                            plugins: function () {
                              return [
                                require('autoprefixer')
                              ];
                            },
                          }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                    },
                },
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                    },
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream",
                    },
                },
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/vnd.ms-fontobject",
                    },
                },
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml",
                    },
                },
            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                use: ["file-loader"],
            },
            {
                test: webpackIsomorphicTools.regular_expression('images'),
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10240,
                    },
                },
            },
        ],
    },
    resolve: {
        modules: [
          './',
          'node_modules',
        ],
        extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        // extract CSS into separate file
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
        }),
        // for file created by WebpackIsomorphicToolsPlugin
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        // for optimized loading of lodash modules
        new LodashModuleReplacementPlugin({
            // collections: true,
            // shorthands: true
        }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __DEVTOOLS__: reduxDevTools,
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
        webpackIsomorphicTools.development(),
    ],
};
