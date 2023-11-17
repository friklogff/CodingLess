<template>
    <div id="app">
        <!-- 整个页面的主容器 -->
        <div class="sidebar">
            <!-- 侧边栏，包含两个组件：card和list -->
            <card></card> <!-- 侧边栏的卡片组件 -->
            <list></list> <!-- 侧边栏的列表组件 -->
        </div>
        <div class="main">
            <!-- 主要内容区域，包含两个组件：message和usertext -->
            <message></message> <!-- 显示消息的组件 -->
            <usertext></usertext> <!-- 用户输入文本的组件 -->
        </div>
    </div>
</template>

<script>
    import card from '../../components/chat/card.vue' // 引入侧边栏的卡片组件
    import list from '../../components/chat/list.vue' // 引入侧边栏的列表组件
    import message from '../../components/chat/message.vue' // 引入显示消息的组件
    import usertext from '../../components/chat/usertext.vue' // 引入用户输入文本的组件

    export default {
        name: 'FriendChat', // 组件的名称
        data () {
            return {

            }
        },
        mounted:function() {
            this.$store.dispatch('initData'); // 在组件挂载时，调用Vuex中的initData动作初始化数据
        },
        components:{
            card, // 注册卡片组件
            list, // 注册列表组件
            message, // 注册消息组件
            usertext // 注册用户输入文本组件
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        margin: 20px auto;
        width: 800px;
        height: 600px;
        overflow: hidden;
        border-radius: 10px;
        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            color: #f4f4f4;
            background-color: #2e3238;
            width: 200px;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>
