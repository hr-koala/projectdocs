# Vite多环境配置及变量识别规则

## 多环境配置的实现方式
在实际开发场景中，很多时候会用到多环境配置，一般项目至少会区分dev和prod环境，然后在不同的环境下给相同参数设置一个不一样的值。在vite中也提供了这种能力，在官方文档中给出了一个示例：
```ts
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```
### 1. envDir
按照官方所说，vite会从环境目录中加载我们编写的.env.[mode]相关文件，这里默认取的是项目根目录，在实际开发时，我们肯定希望将配置文件放置在单独的文件夹下，这样可以使项目结构更加清晰，那么如何指定vite加载环境配置的目录呢？我们可以通过在vite.config.ts中指定envDir来告诉vite多环境配置文件加载的路径：
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./viteEnv",//这里使用相对路径，绝对路径其实也可以
  server:{
    port: 3001,
    strictPort: true
  },
  plugins: [vue(), vueJsx()]
})
```
```ts
viteEnv/
    |--.env.local
    |--.env.develop
    |--.env.develop.local
    |--.env.production
    |--.env.production.local
```
```ts
// # .env.local
// # 所有模式下都会加载，但是会被git忽略
VITE_APP_NAME= venus
// # .env.develop 测试环境参数值
VITE_OWNER=developer
VITE_POSITION=shanghai
VENUS_CONNECTION_TIMEOUT = 30000
// # .env.develop.local 仅在develop模式下加载，但是会被git忽略,相同变量名时，此文件中的优先
VENUS_CONNECTION_TIMEOUT = 10000
// # env.production 生产环境参数值
VITE_OWNER=production
VITE_POSITION=china
VENUS_CONNECTION_TIMEOUT = 3600
```
然后修改package.json，通过不同的指令，来启动不同环境：
```ts
"scripts": {
  "start": "vite --mode develop",
  "start:prod": "vite --mode production",
  "build": "vue-tsc --noEmit && vite build --mode develop",
  "build:prod": "vue-tsc --noEmit && vite build --mode production",
  "preview": "vite preview"
}
```

## 2. vite识别环境变量的规则
vite并非将你写在配置文件中的所有变量（或者说参数）都会透传给客户端，在我们没有特殊配置的时候，它只会识别VITE_开头的参数，我们可以在入口文件中打印一下：
```ts
// # main.ts是我这个项目的入口文件，相关代码会在客户端执行，在这里打印一下变量
console.log(import.meta.env)
// 结果如下：
{
  "VITE_OWNER": "developer",
  "VITE_POSITION": "shanghai",
  "VITE_APP_NAME": "venus",
  "BASE_URL": "/",
  "MODE": "develop",
  "DEV": true,
  "PROD": false,
  "SSR": false
}
```
可以看到只有我们写的VITE_开头的变量才能打印出来。

其他变量是vite默认提供的几个值，含义如下：
```ts
import.meta.env.MODE: {string} 应用运行的模式。
import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。由base 配置项决定。
import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
```
那么有没有什么办法指定我们要读哪些参数呢，VITE_开头的这个规则是不是可以修改的？其实是可以的，我们在vite.config.ts中新加入一个参数envPrefix：
```ts
export default defineConfig({
  envDir: "./viteEnv",
  envPrefix: ["VITE", "VENUS"], //这个时候，我们可以将VITE_、VENUS_开头的变量统统透传给客户端
  server:{
    port: 3001,
    strictPort: true
  },
  plugins: [vue(), vueJsx()]
})
```

## 3. 同样的参数名，在.env.[mode], .env.local, .env.[mode].local中具有怎样的优先级顺序？
在.env.local, .env.develop.local, .env.develop中配置一个相同的参数VENUS_CONNECTION_TIMEOUT，然后在客户端打印就会发现，
```ts
.env.[mode].local 这个文件中的优先级最高
.env.[mode] 优先级次之
.env.local 优先级最低
```

## 4. 在服务端如何获取到env中的变量参数
上面我们看到的是vite将env中的变量透传给客户端的情况，然而有些参数我们可能需要在服务端用到，这个时候如何获取呢？以vite.config.ts文件为例，这是一个配置文件，在服务端启动时加载，相关内容会打印到服务端的控制台上。
vite提供了一个loadEnv函数，用于加载到相关参数
```ts
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//在服务端获取配置参数
const console = require("console")
console.log(loadEnv('develop', './viteEnv'))
// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./viteEnv",
  envPrefix: ["VITE", "VENUS"],
  server:{
    port: 3001,
    strictPort: true
  },
  plugins: [vue(), vueJsx()]
})
```
这样就可以在服务端获取到相关参数了，需要注意的是，我们在下面自定义的VENUS_开头的参数并不会获取到，如果需要，我们要在loadEnv函数参数中显式的指定前缀：
```ts
loadEnv('develop', './viteEnv', ["VITE", "VENUS"])
```
## 5. 变更为生产模式
这里是指在非生产模式下，将程序运行模式修改为生产模式，官方举了一个staging的例子，staging表示预发环境，在一些大公司，会有这样一个环境，用做准生产验证，这个环境启动时，我们可能希望staging应用应该具有类似于生产的行为。
只需要在.env.[mode]文件中加入一个参数：
```ts
NODE_ENV=production
```
然后我们就会发现，vite默认参数中用来标识生产的PROD值就会变为true。
```ts
{
  "VITE_USER_NODE_ENV": "production",
  "VITE_OWNER": "developer",
  "VITE_POSITION": "shanghai",
  "VITE_APP_NAME": "venus",
  "VENUS_CONNECTION_TIMEOUT": "600",
  "BASE_URL": "/",
  "MODE": "develop",
  "DEV": false,
  "PROD": true, //已经变为生产环境
  "SSR": false
}
```
为什么会是这样一个参数呢？看名字，这个似乎和node有关系，我们在vite.config.ts中打印一下node的环境变量看一下：
```ts
const process = require("process")
console.log(process.env)
```
环境变量中确实多了一个这样的参数。为什么会这样呢？这个值不仅将我的环境变成了生产模式，这个参数还出现在了nodejs的环境变量中。我猜测有两种可能：
- 1.是NODE_ENV是个vite和nodejs都能识别的特殊参数，可以起到改变环境模式的作用。
- 2.是vite的env中配置的NODE_开头的参数都会被传递给nodejs，用于控制nodejs的行为。
于是我又配置了一个NODE_DEMO，接着打印process.env，却发现并没有在这里出现。看来NODE_ENV确实是个特殊值。

