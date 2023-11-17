### VueHR 项目 Utils 文件总结

#### 1. axios.js - Axios 请求处理和封装

- **文件路径：** `vuehr/src/utils/axios.js`
- **功能概要：**
    - 设置 Axios 拦截器，实现对请求和响应的统一处理。
    - 处理成功和失败的响应，显示不同类型的消息，并根据不同的状态码进行相应的处理。
    - 提供了常用的请求封装函数，如 `postKeyValueRequest`、`postRequest`、`putRequest`、`getRequest` 和 `deleteRequest`。

#### 2. menu.js - 动态加载菜单和格式化路由

- **文件路径：** `vuehr/src/utils/menu.js`
- **功能概要：**
    - 提供了 `initMenu` 函数，用于在应用启动时根据用户角色动态加载菜单路由。
    - 通过异步请求获取菜单数据，然后调用 `formatRoutes` 函数格式化路由数据。
    - 在 Vue Router 中动态添加格式化后的路由，同时更新 Vuex 中的路由状态。

#### 3. mymessage.js - 自定义消息提示模块

- **文件路径：** `vuehr/src/utils/mymessage.js`
- **功能概要：**
    - 封装了 Element-UI 的 Message 组件，增加了一些自定义的功能。
    - 使用 Symbol 来创建私有方法 `showMessage`，用于控制消息的显示。
    - 提供了 `info`、`warning`、`error` 和 `success` 方法，分别用于显示不同类型的消息，并可以控制是否只显示一条消息。

#### 4. sockjs.js - SockJS 客户端库

- **文件路径：** `vuehr/src/utils/sockjs.js`
- **功能概要：**
    - 引入 SockJS 客户端库的版本 1.1.2。
    - 提供了库的网址和采用 MIT 许可的信息。
    - SockJS 是一个用于创建 WebSocket 的轻量级库。

#### 5. stomp.js - Stomp Over WebSocket 客户端库

- **文件路径：** `vuehr/src/utils/stomp.js`
- **功能概要：**
    - 引入通过 CoffeeScript 1.7.1 生成的 Stomp Over WebSocket 客户端库。
    - 提供了库的文档链接，使用 Apache License V2.0 许可的版权信息。
    - Stomp 是一种简单消息协议，通常用于在客户端和服务器之间进行异步消息传递。

这些文件位于 VueHR 项目的 `utils` 目录下，为项目提供了处理请求、动态加载菜单、自定义消息提示以及 WebSocket 相关功能的支持。这有助于提高项目的可维护性和开发效率。