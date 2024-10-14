const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name]-[fullhash].js',
        path: path.resolve(__dirname, '../dist')
    },
    cache: {
        // 性能优化
        type: 'filesystem',
        allowCollectingMemory: true,
        buildDependencies: {
            config: [__filename], // 监视当前配置文件
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    // 性能优化
                    {
                        loader: 'thread-loader', // 使用多线程加载器
                        options: {
                            workers: 2, // 线程数量，通常可以设置为 CPU 核心数
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: true, // 启用缓存
                        }
                    }
                ]
            },
            {
                test: /\.module\.(sa|sc|c)ss$/, // 只处理 .module.css 文件
                use: [
                    // 性能优化
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', ,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Webpack App',
            scriptLoading: 'defer',

        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        require('autoprefixer')
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue']
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            // 选择哪些块进行拆分
            chunks: 'all', // 拆分所有类型的块（同步和异步）
            // 拆分的最小大小
            minSize: 30000, // 最小大小为 30KB
            // 拆分的最大大小
            maxSize: 300000, // 最大大小为 300KB
            // 至少需要被引用的次数
            minChunks: 1, // 至少被引用一次
            // 最大异步请求数量
            maxAsyncRequests: 5, // 最大异步请求数
            // 最大初始请求数量
            maxInitialRequests: 3, // 最大初始请求数
            // 自动命名分隔符
            automaticNameDelimiter: '~',
            // 自定义命名函数
            name: (module, chunks, cacheGroupKey) => {
                const allChunksNames = chunks.map(chunk => chunk.name).join('~');
                return `${cacheGroupKey}~${allChunksNames}`;
            },
            // 缓存组配置
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 匹配 node_modules
                    priority: -10, // 优先级
                    minSize: 30000, // 最小大小为 30KB
                    maxSize: 300000, // 最大大小为 300KB
                },
                default: {
                    minChunks: 2, // 需要被引用的最小次数
                    priority: -20, // 优先级
                    reuseExistingChunk: true // 允许重用现有块
                }
            }
        }
    }


}