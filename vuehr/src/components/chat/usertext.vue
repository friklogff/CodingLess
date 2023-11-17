<template>
    <!-- 用户输入文本区域的根元素 -->
    <div id="uesrtext">
        <!-- 文本输入框，使用 v-model 实现数据的双向绑定 -->
        <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
    </div>
</template>

<script>
    // 引入 Vuex 中的 mapState 函数
    import { mapState } from 'vuex'

    export default {
        // 组件的名称
        name: 'uesrtext',
        // 组件的数据
        data() {
            return {
                // 文本输入框的内容
                content: ''
            }
        },
        // 使用 mapState 将 Vuex 中的状态映射到组件的计算属性中
        computed: mapState([
            'sessions',         // 消息会话数组
            'currentSession'    // 当前聊天会话
        ]),
        // 组件的方法
        methods: {
            // 添加消息的方法，通过按下 Ctrl + Enter 触发
            addMessage(e) {
                // 检查是否按下了 Ctrl 键，按下了 Enter 键，且文本内容不为空
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    // 创建消息对象
                    let msgObj = new Object();
                    msgObj.to = this.currentSession.username;
                    msgObj.content = this.content;
                    // 使用 WebSocket 发送消息
                    this.$store.state.stomp.send('/ws/chat', {}, JSON.stringify(msgObj));
                    // 提交 mutation 添加消息到消息列表
                    this.$store.commit('addMessage', msgObj);
                    // 清空文本输入框的内容
                    this.content = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /* 样式定义开始 */
    #uesrtext {
        /* 定位到屏幕底部右侧，占据整个屏幕宽度，高度占屏幕的 30% */
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 30%;
        /* 添加上边框 */
        border-top: solid 1px #DDD;

        /* 文本输入框样式 */
        > textarea {
            padding: 10px;
            width: 100%;
            height: 100%;
            /* 去除边框 */
            border: none;
            /* 去除输入框的默认轮廓 */
            outline: none;
        }
    }
    /* 样式定义结束 */
</style>
