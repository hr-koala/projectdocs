# vue-monorepo

`monorepo` 介绍：  
`monorepo` 是一种将多个 `package` 放在一个 `repo` 中的代码管理模式  
vue3 中使用 `yarn workspace+lerna` 来管理项目  
`monorepo` 环境搭建：

- 项目初始化 `yarn init -y`
- 创建其他的子包
  目录：`pageages/reactivity`
  目录下创建 `yarn init -y` 生成 `package.json` ;

  ```js
  {
    "name":"@vue/reactivity",
    "buildOptions":{
        "name":"VueReactivity",
        "formats":["esm-bundler","cjs"]
    }
  }
  ```

  创建 `src/index.ts`

  目录：`pageages/shared`
  目录下创建 `yarn init -y` 生成 `package.json` ;

  ```js
  {
    name: "@vue/reactivity";
  }
  ```

- 安装 `rollup` 打包的相关依赖
  `yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa -D -W`
- 配置 `rollup` 打包配置文件
  `build.js ; rollup.config.json`

`yarn add typescript -D -W` 安装到根目录

```js
{
    "private":true,
    "workspaces":["packages/*"]
}
```
