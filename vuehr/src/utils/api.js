// 引入 Axios 库
import axios from 'axios';
// 引入 Element-UI 的 Message 组件
import { Message } from 'element-ui';
// 引入路由实例
import router from '../router';
// 引入自定义的 mymessage 模块（假设在你的项目中已经定义）
import { mymessage } from '@/utils/mymessage';

// 设置 Axios 响应拦截器
axios.interceptors.response.use(
  // 请求成功时的处理函数
  success => {
    // 判断业务状态码为 500 的情况
    if (success.status && success.status == 200 && success.data.status == 500) {
      // 使用 Element-UI 的 Message 组件显示错误消息
      Message.error({ message: success.data.msg });
      return;
    }
    // 如果响应中有成功消息
    if (success.data.msg) {
      // 使用 Element-UI 的 Message 组件显示成功消息
      Message.success({ message: success.data.msg });
    }
    // 返回响应数据
    return success.data;
  },
  // 请求错误时的处理函数
  error => {
    // 根据不同的 HTTP 状态码进行相应的处理
    if (error.response.status == 504 || error.response.status == 404) {
      // 显示服务器错误消息
      Message.error({ message: '服务器被吃了( ╯□╰ )' });
    } else if (error.response.status == 403) {
      // 显示权限不足消息
      Message.error({ message: '权限不足，请联系管理员' });
    } else if (error.response.status == 401) {
      // 使用自定义的 mymessage 模块显示错误消息
      mymessage.error({ message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录' });
      // 跳转到登录页面
      router.replace('/');
    } else {
      // 如果错误响应中有消息，则显示该消息；否则显示未知错误消息
      if (error.response.data.msg) {
        Message.error({ message: error.response.data.msg });
      } else {
        Message.error({ message: '未知错误!' });
      }
    }
    // 返回空，表示处理错误但不再传递错误
    return;
  }
);

// 设置基础 URL
let base = '';

// 发送带有键值对参数的 POST 请求
export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    // 转换请求数据，将对象转为 x-www-form-urlencoded 格式
    transformRequest: [function (data) {
      let ret = '';
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
      }
      return ret;
    }],
    // 设置请求头为 application/x-www-form-urlencoded
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 发送普通的 POST 请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  });
}

// 发送 PUT 请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  });
}

// 发送 GET 请求
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  });
}

// 发送 DELETE 请求
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params
  });
}
