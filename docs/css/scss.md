# vue vite sass 报错处理  Sass 3.0.0
## 1. Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0
sass 1.80 不再支持 @import 需要使用 `@use’

错误提示:
>
 DEPRECATION WARNING: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
 More info and automated migrator: https://sass-lang.com/d/import
--`@import "./element-plus.scss"`;
>

修改方法:
```ts
@use "@/variables.scss";
```
## 2. Deprecation Warning: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
sass 1.80 不再支持全局内置函数

错误提示:
>
 Deprecation Warning: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
 Use string.slice instead.
 More info and automated migrator: https://sass-lang.com/d/import
 -- `flex-direction: map-get($flex-fds, str-slice($str, 1, 1))`;
>
修改方法:
```ts
npm install -g sass-migrator
$ sass-migrator module --migrate-deps <YOUR-ENTRYPOINT.scss>
```
## 3. Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
sass 1.80 不再支持老的 js api 接口

错误提示:  
在开发环境启动 vite@5、sass@1.69.x 项目后，发现控制台出现如下的 warning 报错：
>
 Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
 More info: https://sass-lang.com/d/legacy-js-api
>
原因分析：  
其实通过报错提供的链接就可以知道，sass 提供的某些 js api 即将在 v2.0.0 的新版本中废弃了，提醒你及时更新

解决方案：  
1、降级 sass 版本到 1.32.13，这是没有警告的最后一个版本
2、在 vite.config.ts 中关闭警告
```ts
export default defineConfig({
	css: {
    	preprocessorOptions: {
      		scss: {
        		// quietDeps: true, // 可以尝试，但在高版本中似乎不起作用
        		silenceDeprecations: ['legacy-js-api'],
      		}
    	}
  	}
})
```
3、前面两种方案指标不治本，最优解法是使用新版 api 解决根本问题：

修改方法 `vue.config.js`:
```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'  // 修改api调用方式
      },
    },
  },
});
```
## 4. Internal server error: [sass] Undefined variable.
sass 1.80 全局变量和 mixin 需要手动导出

错误提示:
>
 [vite] Internal server error: [sass] Undefined variable.  
   color: $color-blue;

 [vite] Internal server error: [sass] Undefined mixin.  
     @include func(css);
    ^^^^^^^^^^^^^^^
>
修改方法 `vue.config.js`:
```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/variables.scss" as *;`, // 导出全局变量和 mixin
      },
    },
  },
});
```
