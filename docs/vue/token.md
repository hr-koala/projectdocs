## token 认证机制

## 2.token 的作用？

## 3.权限管理

前端权限控制可以分为四个方面：  
(1) **接口权限**
接口权限目前一般采用 jwt 的形式来验证，没有通过的话一般返回 401，跳转到登录页面重新进行登录  
登录完拿到 token，将 token 存起来，通过 axios 请求拦截器进行拦截，每次请求的时候头部携带 token

```js
axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
})
axios.interceptors.response.use(res=>{},{response}=>{
    if (response.data.code === 203) { // 登录过期
        router.push('/login')
    }
})
```

(2)**路由权限**  
方案二  
初始化的时候先挂载不需要权限控制的路由，比如登录页，404 等错误页。如果用户通过 URL 进行强制访问，则会直接进入 404，相当于从源头上做了控制  
登录后，获取用户的权限信息，然后筛选有权限访问的路由，在全局路由守卫里进行调用 addRoutes 添加路由

```js
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // getToken from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("admin") >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ["/login", "/authredirect"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) {
    // determine if there has token
    /_ has token_/;
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done(); // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完 user*info 信息
        store
          .dispatch("GetUserInfo")
          .then((res) => {
            // 拉取 user_info
            const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              // 根据 roles 权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({ ...to, replace: true }); // hack 方法 确保 addRoutes 已完成 ,set the replace: true so the navigation will not leave a history record
            });
          })
          .catch((err) => {
            store.dispatch("FedLogOut").then(() => {
              Message.error(err || "Verification failed, please login again");
              next({ path: "/" });
            });
          });
      } else {
        // 没有动态改变权限的需求可直接 next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next(); //
        } else {
          next({ path: "/401", replace: true, query: { noGoBack: true } });
        }
        // 可删 ↑
      }
    }
  } else {
    // has no token\_/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login"); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
```

按需挂载，路由就需要知道用户的路由权限，也就是在用户登录进来的时候就要知道当前用户拥有哪些路由权限

(3)**菜单权限**

菜单权限可以理解成将页面与理由进行解耦 #方案一  
菜单与路由分离，菜单由后端返回  
前端定义路由信息

```js
{
    name: "login",
    path: "/login",
    component: () => import("@/pages/Login.vue")
}
```

name 字段都不为空，需要根据此字段与后端返回菜单做关联，后端返回的菜单信息中必须要有 name 对应的字段，并且做唯一性校验  
全局路由守卫里做判断

```js
function hasPermission(router, accessMenu) {
  if (whiteList.indexOf(router.path) !== -1) {
    return true;
  }
  let menu = Util.getMenuByName(router.name, accessMenu);
  if (menu.name) {
    return true;
  }
  return false;
}

Router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    let userInfo = store.state.user.userInfo;
    if (!userInfo.name) {
      try {
        await store.dispatch("GetUserInfo");
        await store.dispatch("updateAccessMenu");
        if (to.path === "/login") {
          next({ name: "home_index" });
        } else {
          //Util.toDefaultPage([...routers], to.name, router, next);
          next({ ...to, replace: true }); //菜单权限更新完成,重新进一次当前路由
        }
      } catch (e) {
        if (whiteList.indexOf(to.path) !== -1) {
          // 在免登录白名单，直接进入
          next();
        } else {
          next("/login");
        }
      }
    } else {
      if (to.path === "/login") {
        next({ name: "home_index" });
      } else {
        if (hasPermission(to, store.getters.accessMenu)) {
          Util.toDefaultPage(store.getters.accessMenu, to, routes, next);
        } else {
          next({ path: "/403", replace: true });
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login");
    }
  }
  let menu = Util.getMenuByName(to.name, store.getters.accessMenu);
  Util.title(menu.title);
});
Router.afterEach((to) => {
  window.scrollTo(0, 0);
});
```

每次路由跳转的时候都要判断权限，这里的判断也很简单，因为菜单的 name 与路由的 name 是一一对应的，而后端返回的菜单就已经是经过权限过滤的  
如果根据路由 name 找不到对应的菜单，就表示用户有没权限访问  
如果路由很多，可以在应用初始化的时候，只挂载不需要权限控制的路由。取得后端返回的菜单后，根据菜单与路由的对应关系，筛选出可访问的路由，通过 addRoutes 动态挂载

(4)**按钮权限**
