let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'production',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:"index.html"
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/)
    ],
    module:{
        noParse:/jquery/,
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    resolve:{
        modules:[path.resolve('node_modules')],
        extensions:['.js','.css','.json','.vue'],
        alias:{
            "bootstrap":"bootstrap/dist/css/bootstrap"
        },
        // mainFields:['style','main'],
        // mainFile:['index.js']
    }
}