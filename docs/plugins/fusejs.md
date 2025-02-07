## `fuse.js`

Fuse.js 是一个功能强大、轻量级的模糊搜索库，通过提供简单的 api 调用，达到强大的模糊搜索效果，无需搞懂复杂的模糊搜索算法。

#### `Fuse.js` 的技术特点

- 简单代码，实现模糊搜索、处理搜索，甚至不需要后端开发技术
- 数据量大的情况下表现优秀，性能很好
- 无 DOM 依赖，既可以在前端使用，也支持在 node.js 后端使用
- 强大的搜索支持：不仅支持搜索字符串数组、对象数组，支持嵌套搜索、加权搜索等

安装 Fuse.js  
> npm install --save fuse.js

```js
// 搜索数据
const list = [
  {
    "title": "Old Man's War",
    "author": {
      "firstName": "John",
      "lastName": "Scalzi"
    }
  },
  {
    "title": "The Lock Artist",
    "author": {
      "firstName": "Steve",
      "lastName": "Hamilton"
    }
  },
....
];

// 搜索配置，可查看官网文档了解参数
const options = {
  keys: [
    "title",
    "author.firstName"
  ]
};
// 实例化 Fuse
const fuse = new Fuse(list, options);

// 传入搜索关键词，返回搜索结果
const pattern = "clolny"
return fuse.search(pattern)
```

除了基本的搜索支持，Fuse.js 支持更高级的嵌套搜索、加权搜索和扩展搜索，对搜索算法有更高要求的开发者可以去阅读文档研究。
