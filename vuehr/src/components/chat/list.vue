<template>
    <!-- 用户列表组件的根元素 -->
    <div id="list">
        <!-- 无序列表，用于显示用户信息 -->
        <ul style="padding-left: 0px">
            <!-- 使用 v-for 遍历用户数组 -->
            <li v-for="item in hrs" :class="{ active: currentSession ? item.username === currentSession.username : false }"
                v-on:click="changeCurrentSession(item)">
                <!-- 用户头像 -->
                <img class="avatar" :src="item.userface" :alt="item.name">
                <!-- 使用 Element-UI 的 Badge 组件显示小红点 -->
                <el-badge :is-dot="isDot[user.username + '#' + item.username]">
                    <!-- 用户名 -->
                    <p class="name">{{ item.name }}</p>
                </el-badge>
            </li>
        </ul>
    </div>
</template>

<script>
    // 引入 Vuex 中的 mapState 函数
    import { mapState } from 'vuex'

    export default {
        // 组件的名称
        name: 'list',
        data() {
            return {
                // 从 sessionStorage 中获取当前用户信息
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        // 使用 mapState 将 Vuex 中的状态映射到组件的计算属性中
        computed: mapState([
            'hrs',              // 用户数组
            'isDot',            // 小红点状态
            'currentSession'    // 当前聊天会话
        ]),
        methods: {
            // 点击用户列表项时触发的方法，用于切换当前聊天会话
            changeCurrentSession(currentSession) {
                this.$store.commit('changeCurrentSession', currentSession)
            }
        }
    }
</script>

<style lang="scss" scoped>
    /* 样式定义开始 */
    #list {
        /* 用户列表样式 */
        li {
            padding: 16px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            list-style: none;

            /* 鼠标悬停时的样式 */
            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
        }

        /* 激活状态下的样式 */
        li.active {
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* 用户头像样式 */
        .avatar {
            border-radius: 2px;
            width: 30px;
            height: 30px;
            vertical-align: middle;
        }

        /* 用户名样式 */
        .name {
            display: inline-block;
            margin-left: 15px;
            margin-top: 0px;
            margin-bottom: 0px;
        }
    }
    /* 样式定义结束 */
</style>
