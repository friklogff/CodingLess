import Vue from 'vue'
import Vuex from 'vuex'
import { Notification } from 'element-ui';
import { getRequest } from "../utils/api";
import '../utils/stomp'
import '../utils/sockjs'

Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
    state: {
        // 路由信息
        routes: [],
        // 会话列表
        sessions: {},
        // 人力资源列表
        hrs: [],
        // 当前会话
        currentSession: null,
        // 当前用户
        currentHr: JSON.parse(window.sessionStorage.getItem("user")),
        // 搜索关键字
        filterKey: '',
        // WebSocket
        stomp: null,
        // 消息提示红点
        isDot: {}
    },
    mutations: {
        // 初始化当前用户
        INIT_CURRENTHR(state, hr) {
            state.currentHr = hr;
        },
        // 初始化路由信息
        initRoutes(state, data) {
            state.routes = data;
        },
        // 切换当前会话
        changeCurrentSession(state, currentSession) {
            Vue.set(state.isDot, state.currentHr.username + '#' + currentSession.username, false);
            state.currentSession = currentSession;
        },
        // 添加消息
        addMessage(state, msg) {
            let mss = state.sessions[state.currentHr.username + '#' + msg.to];
            if (!mss) {
                // 如果会话不存在，初始化为一个空数组
                Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, []);
            }
            // 向会话中添加消息
            state.sessions[state.currentHr.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        // 初始化数据
        INIT_DATA(state) {
            // 从本地存储中获取历史聊天记录
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 初始化人力资源列表
        INIT_HR(state, data) {
            state.hrs = data;
        }
    },
    actions: {
        // 连接 WebSocket
        connect(context) {
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({}, success => {
                // 订阅消息
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    let receiveMsg = JSON.parse(msg.body);
                    // 如果当前会话不存在，或者消息不是来自当前会话的，则显示通知
                    if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
                        Notification.info({
                            title: '【' + receiveMsg.fromNickname + '】发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
                            position: 'bottom-right'
                        })
                        Vue.set(context.state.isDot, context.state.currentHr.username + '#' + receiveMsg.from, true);
                    }
                    // 将消息标记为非自己发送
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    // 添加消息到会话中
                    context.commit('addMessage', receiveMsg);
                })
            }, error => {
                // 连接错误处理
            })
        },
        // 初始化数据
        initData(context) {
            context.commit('INIT_DATA')
            // 获取人力资源列表
            getRequest("/chat/hrs").then(resp => {
                if (resp) {
                    context.commit('INIT_HR', resp);
                }
            })
        }
    }
})

// 监听会话数据的变化，将其保存到本地存储中
store.watch(function (state) {
    return state.sessions
}, function (val) {
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true
})

export default store;
