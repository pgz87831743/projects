<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      :router="true"
  >
    <el-menu-item ><h1 style="color: #2c3c9a">校园社交系统</h1></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/FontPage/ShouYe"><div class="co">首页</div></el-menu-item>
    <el-menu-item index="/FontPage/liaotTian"><div class="co">聊天</div></el-menu-item>
    <el-menu-item index="/MeanPage"><div class="co">后台</div></el-menu-item>
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
