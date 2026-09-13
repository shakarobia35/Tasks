# Service Worker

## 离线技术

> 2000年前，前端往页面存东西——cookies（但cookies本身不是用于存储，且自身具有缺陷）
>
> 厂商开发私有方案——userdata/gears/mozstorage/flash sharedobject(已关闭) 接口不一致
>
> H5标准——Web Storage、Web SQL(已从标准中删除)、IndexedDB，只能实现值的存储而非文件的存储
>
> App Cache——提供声明文件，罗列需缓存的内容（缺陷多，声明文件不足以支撑定制化、灵活性高的功能）已被废除
>
> Service Worker——声明文件→js脚本，可以手动写代码控制缓存

service worker本质是充当web应用程序、浏览器与网络（可用的时候）之间的代理服务器。它会拦截网络请求，根据网络是否可用来采取适当的动作，更新服务器的资源。它还提供入口以推送通知、访问后台同步API。

使用 service worker，可将 app 设置为首先使用缓存资源。这样，即使在离线状态也可以提供默认服务，然后从网络获取更多数据（离线优先）。

service worker是web worker中的一种，相较于js，它是真正的多线程运行。service worker只在https上运行。

## 使用

```html
navigator.serviceWorker.register('/sw.js')
```

```js
self.addEventListener('install',event=>{
    //初始化安装
})
self.addEventListener('activate',event=>{
    //激活生效
})
self.addEventListener('fetch',event=>{
    //拦截、缓存
})
self.addEventListener('message',event=>{
    //通信
})
```

### 1. 注册service worker

***首先加载网页，在网页的<span style="color:red">主进程</span>里注册service worker。***

```js
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {//特质性检测
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
//参数可选，可用来指定所需service worker控制的子作用域
      });
      if (registration.installing) {
        console.log("正在安装 Service worker");
      } else if (registration.waiting) {
        console.log("已安装 Service worker installed");
      } else if (registration.active) {
        console.log("激活 Service worker");
      }
    } catch (error) {
      console.error(`注册失败：${error}`);
    }
  }
};

// …

registerServiceWorker();
```

它工作在 worker 上下文，没有访问 DOM 的权限。

service worker 文件路径相对于源，它只能在service worker 作用域内捕获客户端发出的请求。

### 2. 安装激活，填充缓存

***注册完成之后，浏览器会加载service worker的脚本并进行安装。***

安装过程中会缓存一些资源。安装成功触发active激活状态，激活后可以监听网页控制事件，它可根据情况被中止/唤起。

> 网页被关闭，service worker没有被控制的页面，就会被浏览器自动中止，节省内存；下次打开页面会被唤醒。

如果缓存的资源失败，安装就会报错（失败），service worker不起作用（但不影响网页）。在下次重启时会再次重试。

### 3. service worker支持的方法

**install:站点资源缓存**

监听install事件，用于填充浏览器离线缓存能力。

```js
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");//创建新缓存v1
  await cache.addAll(resources);
    //resource用URL数组指向想缓存的所有资源
};

self.addEventListener("install", (event) => {
  event.waitUntil(
      //确保 Service Worker 不会在 waitUntil() 里面的代码执行完毕之前安装完成。
    addResourcesToCache([
      "/",
      "/index.html",
      "/style.css",
      "/app.js",
      "/image-list.js",
      "/star-wars-logo.jpg",
      "/gallery/bountyHunters.jpg",
      "/gallery/myLittleVader.jpg",
      "/gallery/snowTroopers.jpg",
    ]),
  );
});
```

进程：打开缓存→缓存文件→确认是否所有静态资源已缓存

- **cache**, Service Worker 的存储 API。它是service worker的一个全局对象，作用于域，可储存网络响应发来的资源（比如request/respond键值对），并根据请求生成key。

​	cache\cachestorage

**fetch:监听客户端请求**

获取 service worker 控制的资源（包括指定的作用域内的文档和它引用的其他任何资源）后，触发 `fetch` 事件。借此，我们可以告诉 service worker 让它用这些缓存内容来做什么。

配合respondWith()方法，可劫持HTTP响应。



```js
self.addEventListener("fetch", (event) => {
  event.respondWith(
      caches.match(event.request))
    	.then(function(response){
      //有缓存则返回
      if(response){
          retujrn response;
      }
      //没有，请求信资源
      var fetchRequest = event.request.clone();
      //执行fetch发起请求并返回数据
      return fetch(fetchRequest()
                   .then{function(response){
          if(!response||response!==200||response.type!=='basic'){
              return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
              .then(functhon(cache){
                    //把请求添加至缓存以备后续查询用
                    cache.put(event.request,requestToCache);
                    });
      return reponse;
      }
                   });
  })
});
```

首先响应缓存的 URL 和网络请求的 URL 相匹配的资源。

` event.respondWith()`决定如何响应fetch事件。

`caches.match(event.request)`将请求里每个资源与缓存里可获取的等效资源进行匹配（匹配URL 和标头），查看是否有相应的资源并返回promise。

```
有→返回该缓存数据
无→执行fetch
```

**activate:**

当用户访问网络应用的时候,浏览器会在后台重新下载包含 Service Worker 代码的 .js文件。 若下载下来的文件和当前的 Service Worker 代码文件不同,浏览器会认为文件发生了改变并且会创建一个新的 Service Worker。

新的 Service Worker启动创建,会触发 install事件。但这时候旧的 Service Worker 仍控制着网络应用的页面，新的 Service Worker 将会处于 waiting 状态。 一旦关闭网络应用当前打开的页面,旧的 Service Worker 将会被浏览器杀死，那么新安装的Service Worker上位。这时候将会触发 activate 事件。
