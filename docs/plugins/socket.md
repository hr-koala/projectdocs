```ts
import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "stompjs";

import { getLocalStorage } from "@szkingdom.koca/template/utils";

let timer;
let stompClient;
const server_url = "172.24.16.159:80";

export function initWebSocket() {
  connection();
  // 断开重连机制,尝试发送消息,捕获异常发生时重连
  timer = setInterval(() => {
    try {
      stompClient.send("test");
    } catch (err) {
      console.log("断线了: " + err);
      connection();
    }
  }, 5000);
}

export function connection() {
  const token = getLocalStorage("token");
  // 建立连接对象
  const socket = new SockJS(`ws://${server_url}/ws?token=${token}`); //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
  // 获取STOMP子协议的客户端对象
  stompClient = Stomp.over(socket);
  // 定义客户端的认证信息,按需求配置
  const headers = {
    action: "sub", // 操作类型 sub/pub/req 分别表示订阅，发布，和请求
    topic: "ping", // 主题 格式为 ${func_id}:${business_info}，特殊ping和pong用于心跳
    data: {}, // 发送的消息内容 可选项
  };
  // 向服务器发起websocket连接
  stompClient.connect(
    headers,
    (frame) => {
      // 连接成功
      console.log("Connected: " + frame);
      // 订阅服务端提供的某个topic
      stompClient.subscribe("/topic", (respnose) => {
        console.log(respnose.body); // msg.body存放的是服务端发送给我们的信息
      });
      // 订阅 destination = /unity/ + username 通道
      stompClient.subscribe("/unity/" + "userId", (respnose) => {
        console.log("data: " + JSON.parse(respnose.body));
      });
    },
    (err) => {
      // 连接发生错误时的处理函数
      console.log(err);
    },
  );
}

// 断开连接
export function disconnect() {
  if (stompClient != null) {
    stompClient.disconnect();
    console.log("Disconnected");
  }
}
```

```ts
import { getLocalStorage, setLocalStorage } from "@szkingdom.koca/template/utils";
const server_url = "172.24.16.159:80";
let socket: any; //ws连接对象

let timer: any;

export function initWebSocket() {
  if (socket != null) {
    console.log("已连接到服务器，不需要再次连接!");
    return;
  }
  connection();
  // 断开重连机制,尝试发送消息,捕获异常发生时重连
  timer = setInterval(() => {
    try {
      wsSend("test");
    } catch (err) {
      console.log("断线了: " + err);
      connection();
    }
  }, 5000);
}

export function wsSend(data) {
  const buffer = JSON.stringify(data);
  socket.send(buffer);
}

export function connection() {
  const token = getLocalStorage("token");
  // 建立连接对象
  socket = new WebSocket(`ws://${server_url}/ws?token=${token}`); //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息

  socket.onopen = function () {
    console.log("已连接上服务器ws");
    const data = {
      action: "sub", // 操作类型 sub/pub/req 分别表示订阅，发布，和请求
      channel: "", // 主题 格式为 ${func_id}:${business_info}，特殊ping和pong用于心跳
      data: {}, // 发送的消息内容 可选项
    };
    wsSend(data);
  };
  socket.onmessage = function (e) {
    console.log(e.data);
    setLocalStorage("onmessage", e.data);
  };
  socket.onclose = function (e) {
    console.log("ws已关闭", e);
    socket = null;
  };
  socket.onerror = function (e) {
    console.log(e);
  };
}
```


```ts
import Vue from 'vue'
import { Message } from 'element-ui'
let v = new Vue()
v.$message = Message;
var webSocket = null;
var isConnect = false; //连接状态
var globalCallback = function(e){ console.log(e) };//定义外部接收数据的回调函数
var reConnectNum = 0;//重连次数
 
var websocketUrl =  process.env.VUE_APP_API_WEBSOCKET_URL;
 
//心跳设置
var heartCheck = {
    heartbeatData:{
        DevID:{
            value:Vue.ls.get('devid')
        },
        DevHeart:{
            value:"1"
        }   
    },//心跳包
    timeout: 60 * 1000, //每段时间发送一次心跳包 这里设置为60s
    heartbeat: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）
    start: function () {
        this.heartbeat = setInterval(()=>{
            if (isConnect){
                webSocketSend(this.heartbeatData);
            }else{
                this.clear();
            }
        }, this.timeout);
    },
    reset: function () {
        clearInterval(this.heartbeat);
        this.start();
    },
    clear:function(){
        clearInterval(this.heartbeat);
    }
}
 
//初始化websocket
function initWebSocket(callback) {
    //此callback为在其他地方调用时定义的接收socket数据的函数
    if(callback){
        if(typeof callback == 'function'){
            globalCallback = callback     
        }else{
            throw new Error("callback is not a function")
        }
    }
    if ("WebSocket" in window) {
        webSocket = new WebSocket(websocketUrl);//创建socket对象
    } else {
        Message({
            message: '该浏览器不支持websocket!',
            type: 'warning'
        });
        return
    }
    //打开
    webSocket.onopen = function() {
        webSocketOpen();
    };
    //收信
    webSocket.onmessage = function(e) {
        webSocketOnMessage(e);
    };
    //关闭
    webSocket.onclose = function(e) {
        webSocketOnClose(e);
    };
    //连接发生错误的回调方法
    webSocket.onerror = function(e) {
        webSocketonError(e);
    };
}
 
//连接socket建立时触发
function webSocketOpen() {
    console.log("WebSocket连接成功");
    //首次握手
    webSocketSend(heartCheck.heartbeatData);
    isConnect = true;
    heartCheck.start();
    reConnectNum = 0;
}
//客户端接收服务端数据时触发,e为接受的数据对象
function webSocketOnMessage(e) {
    console.log("websocket信息:");
    console.log(e.data)
    const data = JSON.parse(e.data);//根据自己的需要对接收到的数据进行格式化
    globalCallback(data);//将data传给在外定义的接收数据的函数，至关重要。
}
//socket关闭时触发
function webSocketOnClose(e){
    heartCheck.clear();
    isConnect = false; //断开后修改标识
    console.log(e)
    console.log('webSocket已经关闭 (code：' + e.code + ')')
    //被动断开，重新连接
    if(e.code == 1006){
        if(reConnectNum < 3){
            initWebSocket();
            ++reConnectNum;
        }else{
            v.$message({
                message: 'websocket连接不上，请刷新页面或联系开发人员!',
                type: 'warning'
            });
        }
    }
}
//连接发生错误的回调方法
function webSocketonError(e){
    heartCheck.clear();
    isConnect = false; //断开后修改标识
    console.log("WebSocket连接发生错误:");
    console.log(e);
}
//发送数据
function webSocketSend(data) {
    webSocket.send(JSON.stringify(data));//在这里根据自己的需要转换数据格式
}
//在其他需要socket地方主动关闭socket
function closeWebSocket(e) {
    webSocket.close();
    heartCheck.clear();
    isConnect = false;
    reConnectNum = 0;
}
//在其他需要socket地方接受数据
function getSock(callback) {
    globalCallback = callback
}
//在其他需要socket地方调用的函数，用来发送数据及接受数据
function sendSock(agentData) {
    //下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
    switch (webSocket.readyState) {
        //CONNECTING：值为0，表示正在连接。
        case webSocket.CONNECTING:
            setTimeout(function() {
                sendSock(agentData, callback);
            }, 1000);
        break;
        //OPEN：值为1，表示连接成功，可以通信了。
        case webSocket.OPEN:
            webSocketSend(agentData);
        break;
        //CLOSING：值为2，表示连接正在关闭。
        case webSocket.CLOSING:
            setTimeout(function() {
                sendSock(agentData, callback);
            }, 1000);
        break;
        //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        case webSocket.CLOSED:
        // do something
        break;
        default:
        // this never happens
        break;
    }
}
 
export {
  initWebSocket,
  closeWebSocket,
  sendSock,
  getSock
};
```

```ts
import WebSocket from 'ws';
class Websocket {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.ws = null;
  }
  connect() {
    this.ws = new WebSocket(this.url, this.options);
    this.ws.onopen = () => {
      console.log('Websocket connection opened.');
    };
    this.ws.onmessage = (event) => {
      console.log('Websocket message received.', event.data);
    };
    this.ws.onerror = (error) => {
      console.error('Websocket error occurred.', error);
    };
    this.ws.onclose = () => {
      console.log('Websocket connection closed.');
    };
  }
  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.error('Websocket connection not open.');
    }
  }
  close() {
    this.ws.close();
  }
}
export default Websocket;
```

```ts
import { getLocalStorage } from "@szkingdom.koca/template/utils";
let webSocket; // ws连接对象
// const serverUrl = "172.24.2.88:12180";
const serverUrl = "172.24.16.159:12180";
let isConnect = false; //连接状态

let globalCallback = function (e) {
  console.log(e);
}; //定义外部接收数据的回调函数
let reConnectNum = 0; //重连次数

const heartbeatData = {
  action: "sub", // 操作类型 sub/unsub/pub/req 分别表示订阅，取消订阅，发布，和请求
  channel: "2001:TF2409.CFE", // 主题 格式为 ${func_id}:${business_info}，特殊ping和pong用于心跳
  data: {}, // 发送的消息内容 可选项
};

//心跳设置
const heartCheck = {
  heartbeatData: heartbeatData, //心跳包
  timeout: 60 * 1000, //每段时间发送一次心跳包 这里设置为60s
  heartbeat: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）
  start: function () {
    this.heartbeat = setInterval(() => {
      if (isConnect) {
        webSocketSend(this.heartbeatData);
      } else {
        this.clear();
      }
    }, this.timeout);
  },
  reset: function () {
    clearInterval(this.heartbeat);
    this.start();
  },
  clear: function () {
    clearInterval(this.heartbeat);
  },
};

//初始化websocket
function initWebSocket(callback?) {
  const token = getLocalStorage("token");
  //此callback为在其他地方调用时定义的接收socket数据的函数
  if (callback) {
    if (typeof callback == "function") {
      globalCallback = callback;
    } else {
      throw new Error("callback is not a function");
    }
  }
  if ("WebSocket" in window) {
    webSocket = new WebSocket(`ws://${serverUrl}/ws?token=${token}`); //创建socket对象
  } else {
    console.log("该浏览器不支持websocket!");
    return;
  }
  //打开
  webSocket.onopen = function () {
    webSocketOpen();
  };
  //收信
  webSocket.onmessage = function (e) {
    webSocketOnMessage(e);
  };
  //关闭
  webSocket.onclose = function (e) {
    webSocketOnClose(e);
  };
  //连接发生错误的回调方法
  webSocket.onerror = function (e) {
    webSocketonError(e);
  };
}

//连接socket建立时触发
function webSocketOpen() {
  console.log("WebSocket连接成功");
  //首次握手
  webSocketSend(heartCheck.heartbeatData);
  isConnect = true;
  heartCheck.start();
  reConnectNum = 0;
}

//客户端接收服务端数据时触发,e为接受的数据对象
function webSocketOnMessage(e) {
  console.log("websocket信息:", e);
  const data = JSON.parse(e.data); //根据自己的需要对接收到的数据进行格式化
  const dataText = JSON.parse(data.text);
  globalCallback(dataText); //将data传给在外定义的接收数据的函数，至关重要。
}

//socket关闭时触发
function webSocketOnClose(e) {
  heartCheck.clear();
  isConnect = false; //断开后修改标识
  console.log("webSocket已经关闭 (code：" + e.code + ")");
  //被动断开，重新连接
  if (e.code == 1006) {
    if (reConnectNum < 3) {
      initWebSocket();
      ++reConnectNum;
    } else {
      console.log("websocket连接不上，请重新登录或联系开发人员!");
    }
  }
}

//连接发生错误的回调方法
function webSocketonError(e) {
  heartCheck.clear();
  isConnect = false; //断开后修改标识
  console.log("WebSocket连接发生错误:", e);
}

//发送数据
function webSocketSend(data) {
  webSocket.send(JSON.stringify(data)); //在这里根据自己的需要转换数据格式
}
//在其他需要socket地方主动关闭socket
function closeWebSocket() {
  webSocket.close();
  heartCheck.clear();
  isConnect = false;
  reConnectNum = 0;
}
//在其他需要socket地方接受数据
function getSock(callback) {
  globalCallback = callback;
}
//在其他需要socket地方调用的函数，用来发送数据及接受数据
function sendSock(agentData, callback?) {
  //下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
  switch (webSocket.readyState) {
    //CONNECTING：值为0，表示正在连接。
    case webSocket.CONNECTING:
      setTimeout(function () {
        sendSock(agentData, callback);
      }, 1000);
      break;
    //OPEN：值为1，表示连接成功，可以通信了。
    case webSocket.OPEN:
      webSocketSend(agentData);
      break;
    //CLOSING：值为2，表示连接正在关闭。
    case webSocket.CLOSING:
      setTimeout(function () {
        sendSock(agentData, callback);
      }, 1000);
      break;
    //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
    case webSocket.CLOSED:
      // do something
      break;
    default:
      // this never happens
      break;
  }
}

export { initWebSocket, closeWebSocket, sendSock, getSock };
```

```js
import { WebsocketClient } from "./websocket.ts";

interface UpcWebsocketEvent {
  type: UpcWebsocketEventType;
  data: UpcWebsocketEventInfo;
}

interface UpcWebsocketEventInfo {
  isReconnect: boolean; // 是否是重连
  reconnectable: boolean; // 是否自动重连
  reconnectDivide: number; // 重连间隔 S
  reconnectMaxTimes?: number; // 最大重连次数
  reconnectTimes?: number; // 当前重连次数
}

export enum UpcWebsocketEventType {
  Connected,
  Disconnect,
}

export class UpcWebsocketClient {
  _client = null;
  _url = "";

  isConnect = false; //连接状态
  reConnectNum = 0; //重连次数
  reConnectMaxNum = 3; // 最大重连次数

  // 心跳相关
  _heartTimer = null;
  _heartBeatResolve = null;
  _heartBeatResolveTimer = null;
  heartbeatDat = {};

  // 重连句柄
  _autoReloginTimer = null;
  _autoReloginDivide = 10; // 每隔 10 S 发起一次重连

  // 实例事件, 需全局订阅
  _instanceEventCallback = null;
  // 主题订阅
  _subIndex = 0;
  _subMap = new Map(); // Map<topic, Map<subIndex, listner>>

  constructor(url) {
    this._url = url;
  }

  onInstanceEvent(fn) {
    if (typeof fn == "function") {
      this._instanceEventCallback = fn;
    }
  }

  emitInstanceEvent(event_name: string, data) {
    if (typeof this._instanceEventCallback == "function") {
      this._instanceEventCallback(event_name, data);
    }
  }

  async createWebsocket() {
    if (this._client != null) {
      this._client.dispose();
      this._client = null;
    }

    // 获取token
    // let tokenRet = await this.tokenGenerator();
    // if (tokenRet.code != 0) {
    //     return { code: tokenRet.code, ret_msg: `获取推送服务认证口令失败(${tokenRet.ret_msg})` };
    // }
    // this._token = tokenRet.data.token;    `${this._host}/ws?token=${this._token}`

    return new Promise(() => {
      this._client = new WebsocketClient(this._url, this);
    });
  }

  async start() {
    const ret = await this.createWebsocket();
    if (ret.code != 0) {
      this.autoRelogin();
    }
  }

  pause() {
    // 清理 socket
    this._client && this._client.dispose();
    this._client = null;

    // 如果有心跳，取消心跳
    this._heartTimer && clearTimeout(this._heartTimer);
    this._heartTimer = null;

    // 如果心跳正在进行, 取消回调
    this._heartBeatResolveTimer && clearTimeout(this._heartBeatResolveTimer);
    this._heartBeatResolveTimer = null;
    this._heartBeatResolve = null;

    // 如果在重连, 去掉重连
    this._autoReloginTimer && clearTimeout(this._autoReloginTimer);
    this._autoReloginTimer = null;

    // 清理主题订阅
    this._subIndex = 0;
    this._subMap.clear();

    this.isConnect = false; //连接状态
    this.reConnectNum = 0;

    return;
  }
  // 重连
  async autoRelogin() {
    this._autoReloginTimer = setTimeout(async () => {
      this._autoReloginTimer = null;
      await this.createWebsocket();
      this.isConnect = true;
      // 重连成功
      this.emitInstanceEvent("reconnect", {
        msg: "",
        relogin_divide: this._autoReloginDivide,
      });
    }, this._autoReloginDivide * 1000);
  }
  // 建立连接
  onConnect() {
    this.isConnect = true;
    this.reConnectNum = 0;
    // this._client.sendMessage(JSON.stringify(this.heartbeatDat));
  }

  onDisconnect(e) {
    console.log(`webSocket已经关闭 (code：${e})`);
    // 清理 socket
    this._client && this._client.dispose();
    this._client = null;

    // 如果有心跳，取消心跳
    this._heartTimer && clearTimeout(this._heartTimer);
    this._heartTimer = null;
    // 如果心跳正在进行, 取消回调
    this._heartBeatResolveTimer && clearTimeout(this._heartBeatResolveTimer);
    this._heartBeatResolveTimer = null;
    this._heartBeatResolve = null;

    // 触发掉线通知掉线
    this.emitInstanceEvent("disconnect", {
      msg: "",
      relogin_divide: this._autoReloginDivide,
    });
    // 自动重连
    if (e.code == 1006) {
      if (this.reConnectNum < this.reConnectMaxNum) {
        this.autoRelogin();
        ++this.reConnectNum;
      } else {
        console.log("websocket连接不上，请重新登录或联系开发人员!");
      }
    }
  }

  onMessage(message: string) {
    const msg = JSON.parse(message);
    // console.log("onMessage", msg);
    if (!msg.channel) {
      console.error("onMessage error ");
      return;
    }
    this.handlePublish(msg);
    // if (msg.code == 102) {
    //   // 重新订阅
    //   this.handleLoginAns(msg);
    // }
  }

  handleLoginAns(msg) {
    console.log(msg);
    const ret = msg;
    if (ret.code == 0) {
      this.keepHeartBeat();
      // 恢复订阅
      this.recoverSubscribe();
    }
  }
  // 心跳
  keepHeartBeat() {
    this._heartTimer = setTimeout(async () => {
      this._heartTimer = null;
      const ret = await this.sendHeartBeat();
      if (ret.code != 0) {
        return this.onDisconnect();
      }
      return this.keepHeartBeat();
    }, 60 * 1000); // 1 分钟发一次心跳
  }
  // 发送心跳
  sendHeartBeat() {
    return new Promise((resolve) => {
      this._heartBeatResolve = resolve;
      this._heartBeatResolveTimer = setTimeout(() => {
        this._heartBeatResolveTimer = null;
        if (this._heartBeatResolve !== null) {
          this._heartBeatResolve({ code: 100, ret_msg: "sendHeartBeat timeout", data: null });
          this._heartBeatResolve = null;
        }
      }, 10 * 1000);
      const reqData = {
        action: "req",
        channel: "ping",
      };
      this._client.sendMessage(JSON.stringify(reqData));
    });
  }

  handleHeartBeatAns() {
    // 清除超时定时器
    if (this._heartBeatResolveTimer != null) {
      clearTimeout(this._heartBeatResolveTimer);
      this._heartBeatResolveTimer = null;
    }
    // 触发回报  心跳不会并行发送, 这么干不会有问题
    if (typeof this._heartBeatResolve == "function") {
      this._heartBeatResolve({ code: 0, ret_msg: "success", data: null });
      this._heartBeatResolve = null;
    }
  }

  handlePublish(msg) {
    const topic = msg.channel;
    const handleMap = this._subMap.get(topic);
    if (handleMap != null) {
      handleMap.forEach((fn) => {
      try{
      fn(JSON.parse(msg.text))
      }catch(e){
        console.log(e)
      }
      });
    }
  }

  recoverSubscribe() {
    this._subMap.forEach((handleMap, topic) => {
      if (handleMap != null && handleMap.size > 0) {
        const reqData = {
          action: "sub",
          channel: topic,
          data: {},
        };
        this._client.sendMessage(JSON.stringify(reqData));
      }
    });
  }
  // 订阅指定主题并注册监听器函数
  subscribe(topic: string, listener: () => void) {
    if (typeof listener != "function") return;
    let handleMap = this._subMap.get(topic);
    if (handleMap == null) {
      handleMap = new Map();
      this._subMap.set(topic, handleMap);
    }
    const handle = ++this._subIndex;
    handleMap.set(handle, listener);
    if (handleMap.size == 1) {
      // 初始添加订阅, 需要向后台发送消息
      const reqData = {
        action: "sub",
        channel: topic,
        data: {},
      };
      this._client.sendMessage(JSON.stringify(reqData));
    }
    return handle;
  }

  unsubscribe(topic, handle) {
    const handleMap = this._subMap.get(topic); // 获取对应主题的订阅
    if (handleMap == null || handleMap.size == 0) {
      // 未订阅，无需退订
      return;
    }
    if (typeof handle == "undefined") {
      // 全部退订
      handleMap.clear();
    } else {
      handleMap.delete(handle);
    }
    if (handleMap.size == 0) {
      // 向后台取消订阅
      const reqData = {
        action: "unsub",
        channel: topic,
        data: {},
      };
      this._client && this._client.sendMessage(JSON.stringify(reqData));
    }
  }

  publish(topic, data = {}) {
    const reqData = {
      action: "sub",
      channel: topic,
      data,
    };
    this._client && this._client.sendMessage(JSON.stringify(reqData));
  }

  dispose() {
    // 清理 socket
    this._client && this._client.dispose();
    this._client = null;

    // 如果有心跳，取消心跳
    this._heartTimer && clearTimeout(this._heartTimer);
    this._heartTimer = null;

    // 如果心跳正在进行, 取消回调
    this._heartBeatResolveTimer && clearTimeout(this._heartBeatResolveTimer);
    this._heartBeatResolveTimer = null;
    this._heartBeatResolve = null;

    // 如果在重连, 去掉重连
    this._autoReloginTimer && clearTimeout(this._autoReloginTimer);
    this._autoReloginTimer = null;

    // 清理系统订阅
    this._instanceEventCallback = null;
    // 清理主题订阅
    this._subIndex = 0;
    this._subMap.clear();
  }
}

import { getLocalStorage } from "@szkingdom.koca/template/utils";

export function handleWebsocket() {
  // const serverUrl = "172.24.2.88:12180";
  const serverUrl = "172.24.16.159:80";
  const token = getLocalStorage("token");
  const url = `ws://${serverUrl}/ws?token=${token}`;
  const socket = new UpcWebsocketClient(url);
  socket.start();

  return socket;
}

// const ind=socket.subscribe(toptic, (e) => {
//   data = e;
// });
```