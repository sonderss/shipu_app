module.exports = {
    baseUrl:"././",
    productionSourceMap:false,
    devServer: {

        proxy: {

            '/api': {

                target: 'https://way.jd.com/jisuapi', //对应服务器地址

                changeOrigin: true, //允许跨域

                ws: true,

                pathRewrite: {

                    '^/api': ''

                }

            }

        }

    }

}