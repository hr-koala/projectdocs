---
title: pinia
author: htong
date: "2023-8-28"
---

## pinia 使用插件 pinia-plugin-persistedstate 数据持久化

pinia 持久化存储插件 pinia-plugin-persistedstate 数据持久化

```js
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// store/use-user-store.ts
export const useUserStore = defineStore("storeUser", {
  state() {
    return {
      firstName: "S",
      lastName: "L",
      accessToken: "xxxxxxxxxxxxx",
    };
  },
  // 开启数据持久化
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ["firstName", "lastName"] }, // firstName 和 lastName 字段用 sessionStorage 存储
      { storage: localStorage, paths: ["accessToken"] }, // accessToken 字段用 localstorage 存储
    ],
  },
});
```

模块做了持久化后，以后数据会不会变，怎么办？  
先读取本地的数据，如果新的请求获取到新数据，会自动把新数据覆盖掉旧的数据。  
无需额外处理，插件会自己更新到最新数据。

## 为什么 Pinia 不需要 mutation 了,是怎么实现的?

在 vuex 中使用 mutation 记录数据的更新，action 进行异步操作，而 pinia 在 action 执行完成后会自动发布给订阅者，所以就不需要 mutation。  
Pinia 的 action 不管是同步异步都支持。pinia 采用模块式管理，每个 store 都是独立的，互相不影响。

```js
import { storeToRefs } from "pinia"; //直接从 pinia 中解构数据，会丢失响应式， 使用 storeToRefs 可以保证解构出来的数据也是响应式的
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { id, info: userInfo } = storeToRefs(userStore);
// 批量修改数据
const patchStore = () => {
  userStore.$patch({
    avatar: "xxxx",
    nickname: "JesBrian",
  });
};
// 调用 actions 方法
const setUserId = (id: string = "") => {
  userStore.setId(id);
};
// 重置 store 数据为初始值
const reset = () => {
  userStore.$reset();
};
import useUserStore from "./user";
import useCounterStore from "./counter";

// 统一导出 useStore 方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
  };
}
```

## Suspense

用于协调对组件树中嵌套的异步依赖的处理。

## 微前端

# Qiankun

Qiankun 是阿里巴巴前端体系基于微前端规范实现的一套解决方案。它提供主应用和微应用两种角色。主应用作为整个项目的入口,微应用负责独立业务场景。微应用可以选择 React、Vue 或者其他框架开发,并且可以部署在不同域名下。主应用动态加载微应用,微应用之间也可相互嵌套。提供沙箱机制,确保微应用之间的隔离性。提供主应用和微应用之间的通信方案。支持 SSR 渲染和 TypeScript。
