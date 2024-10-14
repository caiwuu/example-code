module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['> 1%', 'last 2 versions'], // 这里可以自定义支持的浏览器
        }),
    ],
};