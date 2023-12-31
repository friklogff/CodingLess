### Vue HR - 系统基础组件概览

以下是位于 `vuehr/src/components/sys/basic` 的五个 Vue HR 组件的总结。

#### 1. 部门管理 (`DepMana`)

- **描述:**
    - 管理部门，允许用户添加、删除和搜索部门。
    - 使用 Element UI 组件如 `el-input`、`el-tree` 和 `el-dialog`。
    - 实现了过滤、自定义树节点和添加部门的对话框等功能。

- **关键特点:**
    - 添加和删除部门。
    - 自定义树节点显示。
    - 添加部门的对话框。
    - 使用 HTTP 请求进行异步操作 (`postRequest`、`deleteRequest`)。

#### 2. 奖惩规则 (`EcMana`)

- **描述:**
    - 占位符组件，名称为“奖惩规则”。

#### 3. 职称管理 (`JobLevelMana`)

- **描述:**
    - 管理职称，允许用户添加、删除和编辑职称。
    - 使用 Element UI 组件如 `el-input`、`el-select` 和 `el-table`。
    - 支持职称的批量删除和编辑。

- **关键特点:**
    - 添加、编辑和删除职称。
    - 带有排序和选择的表格视图。
    - 批量删除操作。

#### 4. 权限管理 (`PermissMana`)

- **描述:**
    - 管理角色及其关联的权限。
    - 允许用户添加角色、关联资源和删除角色。
    - 使用 Element UI 组件如 `el-input`、`el-collapse`、`el-tree` 和 `el-button`。

- **关键特点:**
    - 添加和删除角色。
    - 将资源与角色关联。
    - 使用异步请求进行数据操作。

#### 5. 职位管理 (`PosMana`)

- **描述:**
    - 管理职位，提供添加、编辑和删除职位的功能。
    - 使用 Element UI 组件如 `el-input`、`el-button` 和 `el-table`。
    - 支持职位的批量删除和编辑。

- **关键特点:**
    - 添加、编辑和删除职位。
    - 带有排序和选择的表格视图。
    - 批量删除操作。

#### 一般观察:

- **HTTP 请求:**
    - 组件使用 `postRequest`、`deleteRequest`、`putRequest` 等方法与服务器进行交互，表明与后端 API 的集成。

- **Element UI:**
    - 组件广泛使用 Element UI 组件来构建用户界面。

- **数据绑定:**
    - 组件充分利用数据绑定，以同步 UI 元素与底层数据。

- **加载状态:**
    - 实现了加载状态，指示异步操作。

- **样式:**
    - 组件定义了局部样式，以确保封装性。

这些组件共同构成了一个用于管理基本组织实体（如部门、职称、角色和职位）的系统，用于人力资源应用。