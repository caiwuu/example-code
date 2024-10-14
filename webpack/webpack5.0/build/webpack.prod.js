const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimize: true, // 启用压缩
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 删除 console.log
                    },
                    output: {
                        comments: false, // 删除注释
                    },
                },
                extractComments: false, // 不单独提取注释
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ],
}

module.exports = module.exports = merge(baseConfig, prodConfig);