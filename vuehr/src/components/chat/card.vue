<template>
  <!-- 用户卡片组件的根元素 -->
  <div id="card">
    <!-- 头部，包含用户头像和用户名 -->
    <header>
      <!-- 使用 v-bind 动态绑定用户头像和用户名 -->
      <img class="avatar" :src="user.userface" :alt="user.name">
      <p class="name">{{ user.name }}</p>
    </header>
    <!-- 底部，包含搜索框 -->
    <footer>
      <!-- 使用 v-model 双向绑定搜索框的值到 store 中的 filterKey -->
      <input class="search" type="text" v-model="$store.state.filterKey" placeholder="Search user...">
    </footer>
  </div>
</template>

<script>
export default {
  // 组件的名称，使用 PascalCase 形式
  name: 'Card',
  data() {
    return {
      // 从 sessionStorage 中获取用户信息
      user: JSON.parse(window.sessionStorage.getItem('user'))
    };
  }
};
</script>

<style lang="scss" scoped>
/* 样式定义开始 */
#card {
  padding: 12px;
  /* 头部样式 */
  header {
    display: flex;
    align-items: center;
    /* 用户头像样式 */
    .avatar {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      /* 这个是图片和文字居中对齐 */
    }
    /* 用户名样式 */
    .name {
      display: inline-block;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 16px;
    }
  }
  /* 底部样式 */
  footer {
    /* 搜索框样式 */
    .search {
      background: #26292e;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border: 1px solid #3a3a3a;
      border-radius: 4px;
      outline: none;
      /* 鼠标点击后不会出现蓝色边框 */
      color: #fff;
    }
  }
}
/* 样式定义结束 */
</style>
