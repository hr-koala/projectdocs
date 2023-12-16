## path path-browserify

"Path" 是 Node.js 中的一个核心模块，它提供了一组用于处理文件路径的工具函数。  
而 "path-browserify" 则是在浏览器环境下使用 Node.js 中的 "path" 模块的一个浏览器端的实现。  
由于浏览器环境和 Node.js 环境的差异，一些 Node.js 中的模块在浏览器环境下是无法直接使用的，因此需要像 "path-browserify" 这样的模块来解决这个问题。

"Path" 模块提供的一些常用的函数包括：

- path.join([...paths]): 将多个路径片段拼接成一个路径，并返回拼接后的路径。
- path.resolve([...paths]): 将一个或多个路径解析为绝对路径，并返回解析后的路径。
- path.basename(path[, ext]): 返回路径中的最后一个元素的名称，如果指定了 ext，则会从名称中删除扩展名。
- path.dirname(path): 返回路径中的最后一个元素的父目录的路径。

"Path-browserify" 在实现上与 Node.js 中的 "path" 模块类似，但它不能完全支持 Node.js 中的所有功能。在使用时，需要先通过 NPM 安装 "path-browserify" 模块，然后在浏览器环境中使用时，可以通过 "require('path')" 来加载 "path-browserify" 模块，就可以使用其中提供的一些常用函数来处理文件路径了。
