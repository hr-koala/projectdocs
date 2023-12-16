import { SidebarConfig } from "vuepress";

export const sidebarEn: SidebarConfig = [
  {
    text: "Vue",
    link: "/vue/axios",
    collapsible: true,
    children: [
      {
        text: "Vue 项目中有封装过 axios 吗？主要是封装哪方面的？",
        link: "/vue/axios",
      },
      { text: "Vue的diff算法", link: "/vue/diff" },
      { text: "SPA首屏加载速度慢的怎么解决?", link: "/vue/first_page_time" },
      { text: "对keep-alive的理解是什么?", link: "/vue/keepalive" },
    ],
  },
  {
    text: "Vue3 系列",
    link: "/vue3/designgoals",
    collapsible: true,
    children: [
      { text: "Vue3.0 的设计目标是?做了哪些优化?", link: "/vue3/designgoals" },
    ],
  },
  {
    text: "React 系列",
    link: "/react/react",
    collapsible: true,
    children: [
      "/react/react",
      "/react/react_state",
      "/react/react_life_cycle",
      "/react/react_comp_communicate",
      "/react/react_router",
      "/react/react_redux",
      "/react/react_hooks",
      "/react/react_virtual_dom",
      { text: "React SetState的 “前世今生”", link: "/react/react_setstate" },
      { text: "React 常见问题点(一)", link: "/react/react_problem" },
    ],
  },
  {
    text: "Javascript 系列",
    link: "/javascript/throttle",
    collapsible: true,
    children: [
      { text: "什么是柯里化?怎样实现柯里化", link: "/javascript/curry" },
      { text: "对闭包的理解？闭包使用场景", link: "/javascript/closure" },
      { text: "Fun bind/call/apply 原理", link: "/javascript/javascript1" },
      { text: "函数? 对象? Symbol? HTTP?", link: "/javascript/javascript2" },
      { text: "异步?Event Loop?", link: "/javascript/javascript3" },
      { text: "javascript常见问题(一)", link: "/javascript/javascriptp1" },
      { text: "javascript常见问题(二)", link: "/javascript/javascriptp2" },
    ],
  },
  {
    text: "ES6 系列",
    link: "/es6/let_const",
    collapsible: true,
    children: [
      { text: "说说var、let、const之间的区别", link: "/es6/let_const" },
    ],
  },
  {
    text: "HTTP 系列 ",
    link: "/http/HTTP_HTTPS",
    collapsible: true,
    children: [
      {
        text: "什么是HTTP? HTTP 和 HTTPS 的区别?",
        link: "/http/HTTP_HTTPS",
      },
      {
        text: "说说地址栏输入 URL 敲下回车后发生了什么?",
        link: "/http/after_url",
      },
    ],
  },
  {
    text: "NodeJS 系列",
    link: "/nodejs/nodejs",
    collapsible: true,
    children: [{ text: "对nodejs的理解", link: "/nodejs/nodejs" }],
  },
  {
    text: "Webpack 系列",
    link: "/webpack/loader_plugin",
    collapsible: true,
    children: [
      {
        text: "说说Loader和Plugin的区别?编写Loader,Plugin的思路?",
        link: "/webpack/loader_plugin",
      },
    ],
  },
  {
    text: "Vite 系列",
    link: "/vite/error_questions",
    collapsible: true,
    children: [
      { text: "vite 开发常见报错问题", link: "/vite/error_questions" },
    ],
  },
  {
    text: "Css 系列",
    link: "/css/css",
    collapsible: true,
    children: [{ text: "css 常见问题", link: "/css/css" }],
  },
  {
    text: "Plugins 系列",
    link: "/plugins/fusejs",
    collapsible: true,
    children: [{ text: "对 fuse.js 的理解 ", link: "/plugins/fusejs" }],
  },
];
