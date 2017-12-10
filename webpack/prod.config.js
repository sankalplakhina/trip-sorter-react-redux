require('server.babel'); // babel registration (runtime transpilation for node)

const path = require('path');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { webpackHost, webpackPort, reduxDevTools } = require('config/env');
const webpack = require('webpack');
const webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const webpackIsomorphicTools = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

module.exports = {
    performance: {
        hints: false,
    },
    context: path.resolve('./'),
    entry: {
        main: [
            'src/less/styles.less', // entry point for styles
            'src/js/client.js',  // entry point for js
        ],
    },
    output: {
        path: path.resolve('public/assets'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/assets/',
    },
    module: {
        loaders: [
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
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                importLoaders: 1
                            }
                        },
                        {
                          loader: "postcss-loader",
                          options: {
                            sourceMap: false,
                            plugins: function () {
                              return [
                                require('autoprefixer')
                              ];
                            },
                          }
                        }
                    ]
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
                                sourceMap: false,
                                minimize: true,
                                importLoaders: 2
                            }
                        },
                        {
                          loader: "postcss-loader",
                          options: {
                            sourceMap: false,
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
                                sourceMap: false,
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
                // loader: 'url?limit=10000&mimetype=application/font-woff',
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
                // loader: 'url?limit=10000&mimetype=application/font-woff',
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
                // loader: 'url?limit=10000&mimetype=application/octet-stream',
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
                // loader: 'url-loader?limit=10240',
            },        ],
    },
    resolve: {
        modules: [
            './',
            'node_modules',
        ],
        extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name]-[chunkhash].css",
            allChunks: true
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
            __CLIENT__: true,
            __DEVTOOLS__: false,
        }),
        new LodashModuleReplacementPlugin({
            // collections: true,
            // shorthands: true
        }),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        // optimizations
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            sourceMap: false,
        }),
        webpackIsomorphicTools,
    ],
};
