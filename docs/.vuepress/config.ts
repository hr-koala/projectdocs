import { defineUserConfig, defaultTheme } from "vuepress"
import { pwaPlugin } from "@vuepress/plugin-pwa"
import { viteBundler, ViteBundlerOptions } from "@vuepress/bundler-vite"
import { searchPlugin } from "@vuepress/plugin-search"
import { docsearchPlugin } from "@vuepress/plugin-docsearch"

import { head, navbarEn, sidebarEn, navbarZh, sidebarZh } from "./configs/index.ts"

export default defineUserConfig({
  base: "/projectdocs/",
  locales: {
    "/": {
      lang: "en-US",
      title: "Blog and Essay",
      description: "Vue-powered Static Site Generator",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客和随笔",
      description: "Vue 驱动的静态网站生成器",
    },
  },
  head,
  /**
   * Type is `DefaultThemeConfig`
   */
  theme: defaultTheme({
    logo: "/images/logo.png",
    repo: "hr-koala/projectdocs", // 项目仓库的 URL
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: "Github",
    docsDir: "docs", // 文档源文件存放在仓库中的目录名
    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: "hr-koala/projectdocs",
    // docsBranch: "master",
    // displayAllHeaders: true,
    contributors: false,
    sidebarDepth: 4,
    // sidebar: "auto",
    locales: {
      // 默认主题配置
      "/": {
        navbar: navbarEn,
        sidebar: sidebarEn,
        editLinkText: "Edit this page on GitHub",
        lastUpdated: false,
        // lastUpdatedText: "上次更新",
        // a11y
        // openInNewWindow: "在新窗口打开",
        // toggleColorMode: "切换颜色模式",
        // toggleSidebar: "切换侧边栏",
      },
      "/zh/": {
        navbar: navbarZh,
        selectLanguageName: "简体中文",
        selectLanguageText: "选择语言",
        selectLanguageAriaLabel: "选择语言",
        sidebar: sidebarZh,
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",
        // custom containers
        tip: "提示",
        warning: "注意",
        danger: "警告",
        // 404 page
        notFound: [
          "这里什么都没有",
          "我们怎么到这来了？",
          "这是一个 404 页面",
          "看起来我们进入了错误的链接",
        ],
        backToHome: "返回首页",
        // a11y
        openInNewWindow: "在新窗口打开",
        toggleColorMode: "切换颜色模式",
        toggleSidebar: "切换侧边栏",
      },
    },
  }),
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "center",
        },
      },
    },
  }),
  plugins: [
    pwaPlugin({
      // 配置项
    }),
    // docsearchPlugin({
    //   // 配置项
    //   appId: "<APP_ID>",
    //   apiKey: "<API_KEY>",
    //   indexName: "<INDEX_NAME>",
    //   locales: {
    //     "/": {
    //       placeholder: "Search Documentation",
    //       translations: {
    //         button: {
    //           buttonText: "Search Documentation",
    //         },
    //       },
    //     },
    //     "/zh/": {
    //       placeholder: "搜索文档",
    //       translations: {
    //         button: {
    //           buttonText: "搜索文档",
    //         },
    //       },
    //     },
    //   },
    // }),
    searchPlugin({
      // 配置项
      locales: {
        "/": {
          placeholder: "Search",
        },
        "/zh/": {
          placeholder: "搜索",
        },
      },
    }),
  ],
})
