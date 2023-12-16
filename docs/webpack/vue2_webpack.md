## Vue2 项目的 Webpack 配置

- Webpack 安装
  安装 webpack，目前是 webpack5。

```js
npm install -D webpack webpack-cli
```

创建 webpack 配置文件。在项目跟目录下创建文件夹：

- build
- webpack.base.conf.js
- webpack.dev.conf.js
- webpack.prod.conf.js
  安装 webpack-merge 合并配置文件参数

```js
npm install -D webpack-merge
```

安装开发环境服务器

```js
npm install -D webpack-dev-server
```

在 package.json 配置启动脚本，要在脚本传参，需要兼容不同的平台，还要引入一个插件

```js
// npm install -D cross-env
"scripts": {
  "start": "npm run dev",
  "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.prod.conf.js",
  "dev": "cross-env NODE_ENV=development webpack serve --config ./build/webpack.dev.conf.js"
}
```

基础配置

- entry：入口文件，webpack 的功能就是将入口文件引用的文件找到，全部塞到入口文件里，因此默认情况，以及没有异步的情况下，打包出来只有一个 js 文件。
- output：输出配置
- path：打包结果的目录
- publicPath：资源的公共路径，一般用于配置将项目部署到子目录。在 html 中引用打包结果的资源时，会在路径前面加上 publicPath。
- filename：打包结果的文件名称
- chunkFilename：打包结果异步模块的文件名称
- module.rules：非 js 文件的规则配置，webpack 默认只能解析 js 文件。loader 就是用来解析各种非 js 文件，顺序是从后往前。
- webpack5 用 type = 'asset/source' | 'asset/inline' | 'asset/resource' 来代替原来的 raw-loader，url-loader 和 file-loader。type = asset 相当于'asset/inline' | 'asset/resource'的结合，即 file-loader 的功能。
- resolve.extensions：文件名扩展，可以省略引用文件的后缀名
- resolve.alias：路径别名

```js
// webpack.base.conf.js
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.resolve(**dirname, '../src/main.js'),
  output: {
    path: path.resolve(**dirname, '../dist'),
    publicPath: isProd ? './' : '/',
    filename: 'js/[name]_[chunkhash:8].js',
    chunkFilename: 'js/[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|otf|woff2?)(\?\S*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 1024 * 5 }
        },
        generator: {
          filename: 'font/[name]_[hash:8][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 1024 * 5 }
        },
        generator: {
          filename: 'images/[name]_[hash:8][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css', '.json'],
    alias: {
      'src': path.resolve(**dirname, '../src'),
      'views': path.resolve(**dirname, '../src/views'),
      'components': path.resolve(**dirname, '../src/components'),
      'directives': path.resolve(**dirname, '../src/directives'),
      'filters': path.resolve(**dirname, '../src/filters'),
      'images': path.resolve(**dirname, '../src/images'),
      'modules': path.resolve(**dirname, '../src/modules'),
      'style': path.resolve(**dirname, '../src/style'),
      'utils': path.resolve(\_\_dirname, '../src/utils'),
    }
  }
}
```

html 的配置
通过 html-webpack-plugin 可以自动生成一个模板或者指定一个 html 作为模板。webpack 会将同步模块注入到这个模板。在生产环境时，还可以压缩这个 html。

```js
npm install -D html-webpack-plugin
// webpack.base.conf.js

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'xxx 系统',
      template: 'index.html',
      ...(isProd ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
      }, {})
    })
  ]
}
```

babel 配置
babel 用来将 es6+ 的语法转换成低版本的 js，使之可以在低版本的浏览器上运行。

````js
npm install -D babel-loader @babel/preset-env @babel/core

npm install --save core-js@3
// webpack.base.config.js

module.exports = {
module: {
rules: [
{
test: /\.js$/,
use: ['babel-loader?cacheDirectory=true'],
include: path.resolve(\_\_dirname, '../src'),
exclude: /(node_modules)/
},
]
}
}
```js
在根目录新增 .babelrc 文件。以下配置就能实现 polyfill 的按需引入。
```js
// .babelrc

{
"presets": [
[
"@babel/preset-env",
{
"useBuiltIns": "usage",
"corejs": 3
}
]
]
}
````

另一个实现 polyfill 按需引入的方案是 @babel/plugin-transform-runtime + @babel/runtime + @babel/runtime-corejs3。

```js
npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime @babel/runtime-corejs3
// .babelrc

{
"plugins": [
"@babel/plugin-transform-runtime",
{
corejs: 3
}
]
}
```

vue 的配置
npm install -D vue-loader vue-style-loader
vue-loader 用来处理 .vue 文件。v15 后的配置更加简单，原先需要在 vue-loader 的参数中指定 loader 处理 .vue 文件内部的脚本和样式，现在只需要引入 VueLoaderPlugin 这个插件即可，处理这些内容的规则与相应后缀名的文件处理相同。

```js
// webpack.base.conf.js
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, "../src"),
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      // ...
    },
  },
};
```

同时将配置中使用 style-loader 的地方替换成 vue-style-loader。

开发环境配置
通过 webpack-merge 可以合并基础配置。

mode: 指定当前环境，设置为 development 或 production 时都能开启一些默认功能。
target: 设置该参数是为了处理 HMR 失效的问题
devtool: 让控制台的信息映射到真实代码，因为实际上运行的代码时打包处理过的。多个值可选，看需要的信息的详细程度。
devServer：开发服务器配置，相当于 express 和 webpack-dev-middleware 的结合
port：服务运行的端口
hot：是否使用 HMR
compress：是否开启 gzip
open：运行时是否自动打开窗口
proxy：代理

````js
// webpack.dev.conf.js

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
mode: 'development',
target: 'web',
devtool: 'eval-cheap-module-source-map',
devServer: {
port: 9090,
hot: true,
compress: true,
open: true,
proxy: {
'/api/': {
target: 'http://example.com:9090',
changeOrigin: true
}
}
}
})
```js
eslint 配置
eslint 用于语法检查。eslint-loader 即将被 eslint-webpack-plugin 替代。
```js
npm install -D eslint eslint-loader @babel/eslint-parser eslint-plugin-vue
// webpack.dev.conf

module.exports = {
module: {
rules: {
{
test: /\.(js|vue)$/,
loader: 'eslint-loader',
include: path.resolve(\_\_dirname, '../src'),
}
}
}
}
````

在项目根目录新增 .eslintrc.js 配置文件。

```js
// .eslintrc.js
module.exports = {
root: true,
env: {
'browser': true
},
parserOptions: {
parser: '@babel/eslint-parser'
},
extends: [
'plugin:vue/essential'
'eslint:recommended'
]
}
```

.eslintignore 文件可以忽略那些不用语法检查的文件

// .eslintignore

/src/lib
生产环境配置
生成环境需要对代码进行压缩和拆分。

```js
npm install -D clean-webpack-plugin
clean-webpack-plugin 插件可以在构建时清除上一次的内容

// webpack.prod.conf.js

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
plugins: [
new CleanWebpackPlugin()
]
}
```

minimize 开启优化，TerserPlugin 配置 js 压缩的相关参数。splitChunks 对模块进行拆分。下面的拆分方法是将 node_modules 里的模块单独打包成一个文件。

```js
// webpack.prod.conf.js

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
          toplevel: true,
        },
      }),
      `...`,
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "all",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
};
```

css & sass 的配置
npm install -D style-loader css-loader postcss-loader autoprefixer sass-loader sass-resources-loader

npm install --save postcss
css-loader：将 css 解析成字符串
style-loader：将 css 字符串作为内联样式插入页面
postcss-loader：css 后处理器，配合 autoprefixer 给属性补充浏览器前缀
sass-loader：解析 sass
sass-resources-loader： 可以把资源注入到每个文件，用来设置全局变量。

```js
// webpack.dev.conf.js

module: {
  rules: [
    {
      test: /\.s[ac]ss$/,
      include: srcPath,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader",
        {
          loader: "sass-resources-loader",
          options: {
            resources: [path.resolve(__dirname, "../src/style/variable.scss")],
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
  ];
}
```

在根目录创建 postcss.config.js 文件

```js
// postcss.config.js

module.exports = {
  plugins: [require("autoprefixer")],
};
```

生产环境的配置会有所不同。生产环境需要将 css 抽离成单独的文件，避免 js 文件体积过大。且需要压缩体积。

```js
npm install -D mini-css-extract-plugin css-minimizer-webpack-plugin
mini-css-extract-plugin 将 css 抽离成单独的文件
css-minimizer-webpack-plugin 用于压缩 css
// webpack.prod.conf.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
mode: 'production',
module: {
rules: [
{
test: /\.s[ac]ss$/,
                include: srcPath,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: commonScssFile
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
use: [
MiniCssExtractPlugin.loader,
'css-loader',
'postcss-loader'
]
}
]
},
plugins: [
new MiniCssExtractPlugin({
ignoreOrder: true,
filename: 'css/[name]_[contenthash:8].css',
chunkFilename: 'css/[name]_[contenthash:8].css'
})
],
optimization: {
minimizer: [
new CssMinimizerPlugin()
]
}
})
```

analyze
通过 webpack-bundle-analyzer 插件可以分析打包结果模块之间的依赖关系和模块大小。

```js
npm install -D webpack-bundle-analyzer
// package.json

{
"scripts": {
"analyze": "cross-env ANALYZE=true npm run build"
}
}
// webpack.prod.conf.js

const isAnalyze = process.env.ANALYZE

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
plugins: [
...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
]
}
```

完整代码

```js
package.json
{
"scripts": {
"start": "npm run dev",
"build": "cross-env NODE_ENV=production webpack --config ./build/webpack.prod.conf.js",
"dev": "cross-env NODE_ENV=development webpack serve --config ./build/webpack.dev.conf.js",
"analyze": "cross-env ANALYZE=true npm run build"
}
}
webpack.base.conf.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
entry: path.resolve(**dirname, '../src/main.js'),
output: {
path: path.resolve(**dirname, '../dist'),
publicPath: isProd ? './' : '/',
filename: 'js/[name]_[chunkhash:8].js',
chunkFilename: 'js/[name]_[chunkhash:8].js'
},
module: {
rules: [
{
test: /\.(eot|ttf|otf|woff2?)(\?\S*)?$/,
type: 'asset',
parser: {
dataUrlCondition: { maxSize: 1024 * 5 }
},
generator: {
filename: 'font/[name]_[hash:8][ext]'
}
},
{
test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
type: 'asset',
parser: {
dataUrlCondition: { maxSize: 1024 * 5 }
},
generator: {
filename: 'images/[name]_[hash:8][ext]'
}
},
{
test: /\.s[ac]ss$/,
                include: srcPath,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, '../src/style/variable.scss')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
use: [
isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
'css-loader',
'postcss-loader'
]
}
{
test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
include: path.resolve(**dirname, '../src'),
loader: 'vue-loader'
}
]
},
plugins: [
new VueLoaderPlugin(),
new HtmlWebpackPlugin({
title: 'xxx 系统',
template: 'index.html',
...(isProd ? {
minify: {
removeComments: true,
collapseWhitespace: true
}
}, {})
})
],
resolve: {
extensions: ['.js', '.vue', '.scss', '.css', '.json'],
alias: {
'src': path.resolve(**dirname, '../src'),
'views': path.resolve(**dirname, '../src/views'),
'components': path.resolve(**dirname, '../src/components'),
'directives': path.resolve(**dirname, '../src/directives'),
'filters': path.resolve(**dirname, '../src/filters'),
'images': path.resolve(**dirname, '../src/images'),
'modules': path.resolve(**dirname, '../src/modules'),
'style': path.resolve(**dirname, '../src/style'),
'utils': path.resolve(**dirname, '../src/utils'),
'vue$': 'vue/dist/vue.esm.js'
}
}
}
webpack.dev.conf.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
mode: 'development',
target: 'web',
devtool: 'eval-cheap-module-source-map',
devServer: {
port: 9090,
hot: true,
compress: true,
open: true,
proxy: {
'/api/': {
target: 'http://example.com:9090',
changeOrigin: true
}
}
}
})
webpack.prod.conf.js
const isAnalyze = process.env.ANALYZE

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(baseConfig, {
mode: 'production',
plugins: [
new CleanWebpackPlugin(),
new MiniCssExtractPlugin({
ignoreOrder: true,
filename: `${assets}/css/vendor.css?v=[contenthash:${hashLen}]`,
chunkFilename: `${assets}/css/[name].css?v=[contenthash:${hashLen}]`
}),
...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
],
cache: {
type: 'filesystem',
buildDependencies: {
config: [__filename]
}
},
optimization: {
minimize: true,
minimizer: [
new CssMinimizerPlugin(),
new TerserPlugin({
extractComments: false,
terserOptions: {
format:{
comments: false
},
toplevel: true
}
}),
`...`
],
splitChunks: {
cacheGroups: {
vendors: {
chunks: 'all',
name: 'vendors',
test: /[\\/]node_modules[\\/]/
}
}
}
}
})
```

```js
.browserslistrc

> 1%
> last 2 versions
> ie >= 9
> .babelrc
> {
> "presets": [

    [
      "@babel/preset-env",
      {
          "useBuiltIns": "usage",
          "corejs": 3
      }
    ]

]
}
```

```js
.eslintrc.js
module.exports = {
root: true,
env: {
'browser': true
},
parserOptions: {
parser: '@babel/eslint-parser'
},
extends: [
'plugin:vue/essential'
'eslint:recommended'
]
}
```

```js
.eslintignore
/src/lib
postcss.config.js
module.exports = {
plugins: [
require('autoprefixer')
]
};
```
