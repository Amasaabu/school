const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/user/*',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    )
    app.use(
        '/subject/*',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    )
    app.use(
        ['/result/*','/result'],
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    )
    app.use(
        '/session/*',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    )
    app.use(
        '/session',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    )
    app.use(
        '/auth/facebook',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    )
};