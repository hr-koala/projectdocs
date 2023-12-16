## Svg、Png 转 Base64 大法

使用 Base64 编码的优点：

- 减少 HTTP 请求：使用 Base64 编码可以将图像嵌入到 HTML、CSS 或 JavaScript 中，避免了额外的 HTTP 请求，从而提高网站性能。
- 减小文件大小：通过使用 Base64 编码，图像文件的大小将增加约 33%，但是，通过避免额外的 HTTP 请求，可以减少响应时间和带宽消耗。
- 支持跨域：使用 Base64 编码的图像可以在不同的域中使用，避免了跨域请求的问题。
- 简化开发流程：使用 Base64 编码可以简化开发流程，因为你不需要处理图像文件的加载和管理，只需要将其嵌入到 HTML、CSS 或 JavaScript 中即可。
- 提高安全性：使用 Base64 编码可以提高安全性，因为你可以避免在网站中包含外部图像文件的风险，例如恶意软件或跟踪像素。

需要注意的是，使用 Base64 编码的图像可能会增加 HTML、CSS 或 JavaScript 文件的大小，因此需要在性能和文件大小之间进行权衡。此外，使用 Base64 编码的图像可能会影响可维护性和可读性，因为你需要将其嵌入到文本中，而不是作为单独的文件进行管理。

### 根据 Svg 代码转 Base64

```js
const svgToBase64 = (svgCode) => {
  const base64Code = btoa(svgCode);
  const base64SVG = `data:image/svg+xml;base64,${base64Code}`;
  return base64SVG;
};
// 使用实例：
svgToBase64(`<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd"
    d="M11.747 1.95918L4.68715 9.43428L0.252441 4.99957L1.66665 3.58536L4.64616 6.56487L10.2929 0.585938L11.747 1.95918Z"
    fill="#004FD6" />
</svg>`);
// 输出：
// 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgIGQ9Ik0xMS43NDcgMS45NTkxOEw0LjY4NzE1IDkuNDM0MjhMMC4yNTI0NDEgNC45OTk1N0wxLjY2NjY1IDMuNTg1MzZMNC42NDYxNiA2LjU2NDg3TDEwLjI5MjkgMC41ODU5MzhMMTEuNzQ3IDEuOTU5MThaIgogICAgZmlsbD0iIzAwNEZENiIgLz4KPC9zdmc+'
```

### 根据 Png 图片路径转 Base64

```js
function convertPNGtoBase64(url, callback) {
  const img = new Image();
  img.crossOrigin = "Anonymous"; // 跨域设置
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const base64PNG = canvas.toDataURL();
    callback(base64PNG);
  };
  img.src = url;
}
// 将 PNG 图片转为 Base64 编码的函数示例
convertPNGtoBase64("path/to/image.png", function (base64PNG) {
  console.log(base64PNG);
});
```

### 根据 Dom 转 Base64

```js
const myImg = document.getElementById("myImg"); // 获取 Img
// #### Canvas 转 Base64
function canvasBase64() {
  const canvas = document.getElementById("myCanvas");
  const ImgBase64 = canvas.toDataURL("image/png");
  console.log(ImgBase64, "Canvas 转 Base64");
  myImg.src = ImgBase64;
}
// #### Svg 转 Base64
function svgBase64() {
  const svg = document.getElementById("mySvg");
  const s = new XMLSerializer().serializeToString(svg);
  const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(s)}`;
  console.log(ImgBase64, "Svg 转 Base64");
  myImg.src = ImgBase64;
}
// #### Svg 转 png
function svgPng() {
  const svg = document.getElementById("mySvg");
  const s = new XMLSerializer().serializeToString(svg);
  const src = `data:image/svg+xml;base64,${window.btoa(s)}`;
  const img = new Image(); // 创建图片容器承载过渡
  img.src = src;
  img.onload = () => {
    // 图片创建后再执行，转 Base64 过程
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    const ImgBase64 = canvas.toDataURL("image/png");
    console.log(ImgBase64, "Svg 转 png");
    myImg.src = ImgBase64;
  };
}
```
