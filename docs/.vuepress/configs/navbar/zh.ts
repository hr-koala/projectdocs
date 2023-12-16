import { NavbarConfig } from "vuepress";

export const navbarZh: NavbarConfig = [
  { text: "主页", link: "/" },
  {
    text: "指南",
    children: [
      {
        text: "htong 的博客",
        children: [
          { text: "CSDN", link: "https://blog.csdn.net/XJ5210224" },
          {
            text: "Gitee",
            link: "https://gitee.com/explore/web-app-develop",
          },
        ],
      },
      {
        text: "Guide",
        children: [
          { text: "常用功能", link: "/common" },
          { text: "内容搜索", link: "/content" },
        ],
      },
    ],
  },
];
