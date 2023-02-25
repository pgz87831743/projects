<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      :router="true"
  >
    <el-menu-item ><h1>培训信息维护前台</h1></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/FontPage/ShouYe">首页</el-menu-item>
    <el-menu-item index="/FontPage/liaotTian">聊天</el-menu-item>
    <el-menu-item index="/MeanPage">后台</el-menu-item>
  </el-menu>
  <router-view/>
</template>


<script>

export default {
  name: "FontPage",
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
