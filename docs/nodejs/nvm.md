# nvm 安装、node 安装及 node 版本切换管理

先卸载 node！
进入 nvm 下载网页，选择 nvm-setup.exe 下载 // https://nvm.uihtm.com/download.html
重新打开 cmd，输入 nvm 或者 nvm -v 验证
`nvm -v` 查看版本

nvm 安装路径下，打开 setting.txt

```js
root: D:\**\nvm
path: D:\**\nodeJs
arch: 64
proxy: none
originalpath: .
originalversion:
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## 配置淘宝镜像

nvm node_mirror https://npm.taobao.org/mirrors/node/
nvm npm_mirror https://npm.taobao.org/mirrors/npm/
阿里云镜像
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/
腾讯云镜像
nvm npm_mirror http://mirrors.cloud.tencent.com/npm/
nvm node_mirror http://mirrors.cloud.tencent.com/nodejs-release/

## nvm 常用命令

nvm list //展示本地安装的所有版本，\*号表示当前正在用
nvm install [版本号] //安装指定版本 node 例如： nvm install 18.18.0
nvm use 18.18.0 //使用特定版本
nvm uninstall 18.18.0 //卸载指定版本

## nvm 下载 node

nvm install latest
nvm install 14.17.6
nvm install 18.16.0
nvm use 18.16.0 //必须有输入这行命令后，node 命令才会生效
/_检查 node 是否安装成功_/
node -v
npm -v
where node // node 在哪里
npm config ls -ls 命令，将会列出所有的配置参数

## node 环境配置

### 设置淘宝镜像

npm config set registry https://registry.npm.taobao.org

### 配置全局目录

npm config get prefix
npm config get cache
npm config set prefix "D:\*\*\nodeJs\node_global"
npm config set cache "D:\*\*\nodeJs\node_cache"

### 全局安装 cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org
