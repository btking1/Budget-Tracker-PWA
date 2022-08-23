// const webpack = require('webpack')
const  BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const webpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

module.exports = {
    entry: {
        index: './public/js/index.js',
        idb: './public/js/idb.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname + "/dist")
        
    },
    mode: 'development',
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
}
