import { NavbarConfig } from "vuepress";

export const navbarEn: NavbarConfig = [
  { text: "Home", link: "/" },
  {
    text: "Guide",
    children: [
      {
        text: "htong's Bolg",
        children: [
          { text: "CSDN", link: "https://blog.csdn.net/XJ5210224" },
          { text: "Gitee", link: "https://gitee.com/explore/all" },
        ],
      },
      {
        text: "Guide",
        children: [
          { text: "Common Functions", link: "/common" },
          { text: "Content search", link: "/content" },
        ],
      },
    ],
  },
];
