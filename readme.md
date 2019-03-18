## webpack 配置

## resolve 用法
```
    # 与 mode 同级
    resolve:{
        // 可以直接指定查找的目录层级 不再往上级目录查找
        modules:[path.resolve('node_modules')],
        // 配置可以省略后缀的文件
        expensions:['.js','.css','.json','.vue'],
        // 别名 
        alias:{
            "bootstrap":"bootstrap/dist/css/bootstrap"
        },
        // 配置主入口 字段
        // 第三方包的 package.json 里会先找 main（主入口） 字段，再查找别的字段
        mainFiels:['style','main'],
        // 入口文件的名字 通常是 index.js
        mainFile:['index.js']
    }
```

## 区分环境 （开发环境和生产环境）
- webpack.config.js 改为 webpack.base.js
- 新建文件 webpack.prod.js 和 webpack.dev.js
- 下载 webpack-merge
    - yarn add webpack-merge
- 开发环境配置 (webpack.dev.js)
```
    let {smart} = require('webpack-merge');
    let base = require('./webpack.base');
    module.exports = smart(base,{ // 相当于合成 base 文件和 dev 文件
        mode:'development',
        ...
    })
```
- 生产环境配置 (webpack.prod.js)
```
    let {smart} = require('webpack-merge');
    let base = require('./webpack.base');
    module.exports = smart(base,{
        mode:'production',
        ...
    })
```
- 运行脚本修改 package.json
```
    "build":"webpack --config webpack.prod.js",
    "dev":"webpack-dev-server --inline --progress --config webpack.dev.js"
```

## webpack 优化
1. noParse 配置不解析的模块
```
    module:{
        noParse:/jquery/ // 不去解析 jquery 中的依赖库
    }
```
2. IgnorePlugin 忽略打包项 webpack 内置插件 以 moment 库为例
```
    # webpack.base.js plugins
    new webpack.IgnorePlugin(/\.\/locale/,/moment/)

    # index.js
    import moment from 'moment';
    // 配置 IgnorePlugin 插件后 就需要引入 需要的语言模块
    import 'moment/locale/zh-cn'
    // 设置语言 配置 IgnorePlugin 插件前设置
    // moment.loacle('zh-cn')
    // 距离今天结束还有多久
    let r = moment().endOf('day').fromNow()
```