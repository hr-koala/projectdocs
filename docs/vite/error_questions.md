---
title: "vite "
---

### 1.vite-plugin-mock 的 require is not defined 问题

![vite-plugin-mock](/images/vite/vite-plugin-mock.png)

查看一下自己的 vite-plugin-mock 版本, 我的是 3.0.0 的版本  
解决办法：将 vite-plugin-mock 换成 2.9.6 版本  
卸载 3.0.0 ：npm uninstall vite-plugin-mock -D  
安装 2.9.6：npm install vite-plugin-mock@2.9.6 -D

### 2.import.meta.globEager 代替 require.context 自动导入文件

在使用 vite 时，发现不能使用 require.context 自动导入 modules,可以使用 import.meta.globEager 替换

```js
// require 自动引入实现：
const files = require.context('.', false, /\.ts$/);
const modules = {};
files.keys().forEach((key) => {
     if (key === './index.ts') { return; }
     modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});
export default modules;

// import 自动引入实现：
const files = import.meta.globEager("./*.ts")
const modules: any = {};
for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key].default
    }
}
export default modules;
```

#### store/modules 文件夹 处理

```js
const modulesFiles = require.context("./modules", true, /\.ts$/);
// you do not need `import app from './modules/app`
// it will auto require all vuex module from modules file
const modules = modulesFiles
  .keys()
  .reduce((modules: { [x: string]: any }, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, {});
console.log(modules);

// 在使用vite 时，发现不能使用require.context 自动导入modules,可以使用import.meta.globEager替换
const modules: any = {};

// 第一种：
const files = import.meta.globEager("./modules/*.ts");
for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    modules[key.replace(/(\.\/|\.ts)/g, "")] = files[key].default;
  }
}
// 第二种：
const files = import.meta.glob("./modules/*.ts");
for (const key in files) {
  files[key]().then((res) => {
    modules[key.replace(/(\.\/modules\/|\.ts)/g, "")] = res.default;
  });
}
// 第三种： 第二个参数 { eager: true }
const files = import.meta.glob("./modules/*.ts", { eager: true });
for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    modules[key.replace(/(\.\/modules\/|\.ts)/g, "")] = files[key].default;
  }
}

console.log(modules);
```
