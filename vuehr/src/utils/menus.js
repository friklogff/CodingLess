// 导入用于发送 GET 请求的 getRequest 函数
import { getRequest } from "./api";

// 初始化菜单的函数
export const initMenu = (router, store) => {
    // 如果 Vuex 的状态中已经有加载过的路由，则直接返回，不再加载
    if (store.state.routes.length > 0) {
        return;
    }
    // 发送异步请求获取菜单数据
    getRequest("/system/config/menu").then(data => {
        if (data) {
            // 格式化菜单数据
            let fmtRoutes = formatRoutes(data);
            // 将格式化后的路由添加到 Vue Router 中
            router.addRoutes(fmtRoutes);
            // 更新 Vuex 中的路由状态
            store.commit('initRoutes', fmtRoutes);
            // 调用 Vuex 中的 connect action
            store.dispatch('connect');
        }
    });
};

// 格式化路由的函数
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        // 提取路由信息
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        // 递归处理子路由
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        // 构造路由对象
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            // 动态设置路由的 component 属性，根据不同的组件路径引入对应的 Vue 组件
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        };
        // 将处理好的路由对象添加到数组中
        fmRoutes.push(fmRouter);
    });
    // 返回格式化后的路由数组
    return fmRoutes;
};
