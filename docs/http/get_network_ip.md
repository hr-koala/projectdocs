## node 为 vue 获取本机 IP 地址

获取本机 ipv4 地址：
可通过 cmd，执行 ipconfig/all 预览本地 ip 信息；

```js
import os from "os";
function getNetworkIp() {
  let needHost = ""; // 打开的host
  try {
    // 获得网络接口列表
    const network = os.networkInterfaces();
    // console.log("network",network)
    for (const dev in network) {
      const iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          needHost = alias.address;
          // console.log("alias.address",alias.address)
        }
        // console.log("alias",alias)
      }
    }
  } catch (e) {
    needHost = "localhost";
  }
  return needHost;
}
```

## 处理跨域 9 种方法：

1. JSONP
   script / img / link / iframe
2. cors 跨域资源共享： 服务器端设置相关的头部信息

```js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000"); //设置 * 不能设置cookie
});
```

3. 基于 http proxy 实现跨域 => webpack webpack-dev-server

```js
devServer: {
  proxy: {
    '/api': {
      target: '',
        changeOrigin: true
    }
  }
}
```

4. ngnix 反向代理：

```js
server: {
  listen 80,
  ...
}
```

5. postMessage

```js
window.postMessage("message", "url");
window.onmessage = (ev) => {
  console.log(ev);
  ev.source.postMessage(ev.data + "@@@", ev.origin);
};
```

6. webSocket 协议跨域:

```js
socket.io;
let socket = io("url");
socket.on("connect", function () {
  socket.on("message", function () {});
  socket.on("disconnect", function () {});
});
socket.send("");
//服务端
socket.listen(server).on("connection", function (client) {
  client.on("message", function (msg) {
    console.log(msg);
  });
  client.on("disconnect", function () {
    console.log("closed");
  });
});
```

7. document.domain + iframe
8. window.name + iframe
9. location.hash + iframe

### 跨域：

服务端接收到请求并把请求返回了，浏览器把响应拦截了  
浏览器的保护机制：`同源策略`，(协议 域名 端口号) 限制不同源之间交互，避免攻击

cors(Cross Origin Resource Sharing)策略：跨域资源共享 有一系列 http 头组成  
Spring Boot 服务端处理：1.在目标方法上添加 @CorsOrigin 注释 2.添加 cros 过滤器 3.实现 WebMvcConfigure 接口，重写 addCorsMappings 方法

1. 修改响应头：res.header('Access-Control-Allow-Origin', '\*')
2. JSONP ?callback = fn(data){ console.log(data) }
   http 无状态协议  
   console.log(document.cookie)

- cookie 大小 4kb,兼容 H4H5，访问任何窗口，手动设置有效期，存储位置浏览器和服务器，与请求一起发送，语法复杂
- localstorage 大小 10Mb，兼容 H5，访问任何窗口，有效期无，存储位置浏览器，不与请求一起发送，语法简单
- sessionStorage 大小 5Mb，兼容 H5，访问同一窗口，有效期浏览器窗口关闭，存储位置浏览器，不与请求一起发送，语法简单
