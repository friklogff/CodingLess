### Vuex Store 概览

#### 文件位置: `vuehr/src/store/index.js`

这是 Vue.js 应用中的 Vuex Store，用于集中管理应用的状态，包括路由信息、用户会话、人力资源等。以下是该 Store 的主要功能和结构的总结：

#### State (状态)

1. **routes:**
  - 类型：Array
  - 描述：存储应用的路由信息。

2. **sessions:**
  - 类型：Object
  - 描述：保存用户的会话信息，以用户 ID 为键。

3. **hrs:**
  - 类型：Array
  - 描述：存储人力资源列表。

4. **currentSession:**
  - 类型：Object | null
  - 描述：当前用户的活动会话。

5. **currentHr:**
  - 类型：Object
  - 描述：当前用户的个人信息。

6. **filterKey:**
  - 类型：String
  - 描述：搜索关键字。

7. **stomp:**
  - 类型：Object | null
  - 描述：WebSocket 对象，用于实时通信。

8. **isDot:**
  - 类型：Object
  - 描述：用于标记消息提示红点的状态。

#### Mutations (突变)

1. **INIT_CURRENTHR:**
  - 描述：初始化当前用户信息。

2. **initRoutes:**
  - 描述：初始化路由信息。

3. **changeCurrentSession:**
  - 描述：切换当前会话。

4. **addMessage:**
  - 描述：向会话中添加消息。

5. **INIT_DATA:**
  - 描述：从本地存储中初始化数据。

6. **INIT_HR:**
  - 描述：初始化人力资源列表。

#### Actions (动作)

1. **connect:**
  - 描述：连接 WebSocket。

2. **initData:**
  - 描述：初始化数据，包括历史聊天记录和人力资源列表。

#### 监听变化 (Watch)

- 监听会话数据的变化，将其保存到本地存储中。

#### 结论

这个 Vuex Store 在 Vue.js 应用中负责管理全局状态，提供了对路由、用户会话、人力资源等数据的集中管理和更新。通过 WebSocket 进行实时通信，确保了即时消息的处理。