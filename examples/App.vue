<template>
  <div id="app">
    <nav>
      <router-link to="/horizontal">horizontal 例子：完美沙拉公式</router-link>
      <router-link to="/vertical">vertical 例子：部门组织架构</router-link>
    </nav>

    <!-- 工具栏 -->
    <div class="tree-toolbar">
      
    </div>
    <!-- 流程图 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style lang="scss">
nav {
  width: 1200px;
  margin: 10px auto;
  a{
    display: block;
  }
}
</style>

