<template>
    <!-- 消息列表组件的根元素 -->
    <div id="message" v-scroll-bottom="sessions">
        <!-- 只有在有当前聊天会话时才显示消息列表 -->
        <ul v-if="currentSession">
            <!-- 遍历当前聊天会话的消息条目 -->
            <li v-for="entry in sessions[user.username + '#' + currentSession.username]">
                <!-- 消息发送时间 -->
                <p class="time">
                    <span>{{ entry.date | time }}</span>
                </p>
                <!-- 消息内容区域，根据消息发送者添加不同的样式 -->
                <div class="main" :class="{ self: entry.self }">
                    <!-- 根据消息发送者显示不同的头像 -->
                    <img class="avatar" :src="entry.self ? user.userface : currentSession.userface" alt="">
                    <!-- 消息文本内容 -->
                    <p class="text">{{ entry.content }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    // 引入 Vuex 中的 mapState 函数
    import { mapState } from 'vuex'

    export default {
        // 组件的名称
        name: 'message',
        // 组件的数据
        data() {
            return {
                // 从 sessionStorage 中获取当前用户信息
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        // 使用 mapState 将 Vuex 中的状态映射到组件的计算属性中
        computed: mapState([
            'sessions',         // 消息会话数组
            'currentSession'    // 当前聊天会话
        ]),
        // Vue 过滤器，用于格式化消息发送时间
        filters: {
            time(date) {
                if (date) {
                    date = new Date(date);
                }
                return `${date.getHours()}:${date.getMinutes()}`;
            }
        },
        // Vue 自定义指令，用于在发送消息后滚动到底部
        directives: {
            'scroll-bottom'(el) {
                // 使用 setTimeout 模拟滚动到底部
                setTimeout(function () {
                    el.scrollTop += 9999;
                }, 1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    /* 样式定义开始 */
    #message {
        /* 消息列表容器样式 */
        padding: 15px;
        max-height: 68%;
        overflow-y: scroll;

        /* 无序列表样式 */
        ul {
            list-style-type: none;
            padding-left: 0px;

            /* 消息条目样式 */
            li {
                margin-bottom: 15px;
            }
        }

        /* 消息发送时间样式 */
        .time {
            text-align: center;
            margin: 7px 0;

            /* 时间文本样式 */
            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #FFF;
                background-color: #dcdcdc;
                border-radius: 2px;
            }
        }

        /* 消息内容样式 */
        .main {
            /* 头像样式 */
            .avatar {
                float: left;
                margin: 0 10px 0 0;
                border-radius: 3px;
                width: 30px;
                height: 30px;
            }

            /* 消息文本样式 */
            .text {
                display: inline-block;
                padding: 0 10px;
                max-width: 80%;
                background-color: #fafafa;
                border-radius: 4px;
                line-height: 30px;
            }
        }

        /* 如果是自己发送的消息，则样式略有不同 */
        .self {
            text-align: right;

            /* 自己的头像样式 */
            .avatar {
                float: right;
                margin: 0 0 0 10px;
                border-radius: 3px;
                width: 30px;
                height: 30px;
            }

            /* 自己的消息文本样式 */
            .text {
                display: inline-block;
                padding: 0 10px;
                max-width: 80%;
                background-color: #b2e281;
                border-radius: 4px;
                line-height: 30px;
            }
        }
    }
    /* 样式定义结束 */
</style>
