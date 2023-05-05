const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: "./",
    assetsDir: "static",
    outputDir: 'dist',
    lintOnSave: false,
    transpileDependencies: true
})