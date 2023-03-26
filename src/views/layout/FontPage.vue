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
        <el-menu-item ><div style="font-size: 20px;">NOW UI KIT PRO</div></el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/IndexPage">HOME</el-menu-item>
        <el-menu-item index="/SearchResource">FACILITY & APPOINTMENT</el-menu-item>
        <el-menu-item index="/PublishResource">MEMBERSHIP</el-menu-item>
        <el-menu-item index="/1">CONTACTUS</el-menu-item>
        <el-menu-item index="/PersonalCenter"><el-avatar :size="56" src="http://p2.music.126.net/vZ5ef3WzRneTTydXSzPauQ==/109951165994871935.jpg?param=380y140" /></el-menu-item>
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