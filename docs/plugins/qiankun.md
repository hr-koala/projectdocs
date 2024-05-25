# 
## 
微前端：**增量升级，独立运行，技术栈无关，独立开发、独立部署**

动态加载、隔离
**Single-spa/qiankun/MicroApp**

koca-template基座，koca-micro
main: resisterMicroapps / actions.getGlobalState() / .setGlobalState() 
common: commonStore.globalResister(store,props)
sub:renderMicroApp(props), unmountMicroApp(props)
```json
// micro.main.json
{
  "MICRO_APPS": [
    {
      "name": "admin-basic",
      "entries": {
        "dev": "http://localhost:7001/admin-basic/",
        "prod": "http://localhost:7001/admin-basic/"
      },
      "container": "#admin-basic-container",
      "prefixPath": "#/admin-basic"
    },
    {
      "name": "test",
      "entries": {
        "dev": "http://localhost:7002/examples/composition/test/aehyok.html",
        "prod": "http://localhost:7002/examples/composition/test/aehyok.html"
      },
      "container": "#test",
      "prefixPath": "#/test"
    }
  ]
}
```