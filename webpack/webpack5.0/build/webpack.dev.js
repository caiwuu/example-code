const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        // 性能优化：关闭 output.pathinfo 在开发环境下
        pathinfo: false
    },
    optimization: {
        // 性能优化：webpack 通过执行额外的算法任务优化输出结果的体积和加载的性能。这些优化适用于小型代码库，但是在大型代码库中却非常耗费性能
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    stats: {
        all: false,
        errors: true,
        warnings: true,
        modules: false, // 显示模块信息
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        compress: true,
        port: 9000,
        hot: true,    // 启用模块热更新
    },
}
module.exports = merge(baseConfig, devConfig)