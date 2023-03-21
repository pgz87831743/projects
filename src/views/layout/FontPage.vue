<template>
  <div>
    <el-affix >
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
          :default-active="$route.fullPath"
      >
        <el-menu-item ><div style="color: green;font-size: 20px;font-weight: bold">高校数字资源共享平台</div></el-menu-item>
        <el-menu-item index="/IndexPage">首页</el-menu-item>
        <el-menu-item index="/SearchResource">我要找资源</el-menu-item>
        <el-menu-item index="/PublishResource">我要发布资源</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/PersonalCenter">个人中心</el-menu-item>
      </el-menu>
    </el-affix>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "FontPage"
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>