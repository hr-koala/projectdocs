
## npm i报错npm ERR! sha512-XXX，integrity checksum failed when using sha512: wanted sha512-XXXbut got sha

npm i报错

1. **场景复现**
项目下来npm i报错：
![alt text](image.png)
1. **解决方法**
清除 npm 缓存：运行以下命令清除 npm 缓存：
```ts
npm cache clean --force
```
1.删除 node_modules 目录：删除项目根目录中的 node_modules 目录，以删除已下载的包。
2.删除 package-lock.json 文件：删除项目根目录中的 package-lock.json 文件。
3.重新安装依赖项：在清除缓存、删除 node_modules 目录和 package-lock.json 文件后，通过运行以下命令重新安装依赖项：

```ts
npm install
```
