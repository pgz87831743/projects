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
        <el-menu-item ><div style="color: green;font-size: 20px;font-weight: bold">体检预约系统</div></el-menu-item>
        <el-menu-item index="/IndexPage">首页</el-menu-item>
        <el-menu-item index="/PersonalCenter">个人信息</el-menu-item>
        <el-menu-item index="/CityFont">城市信息</el-menu-item>
        <el-menu-item index="/PopulationFont">人口信息</el-menu-item>
        <el-menu-item index="/EconomyFont">经济信息</el-menu-item>
        <el-menu-item index="/GeographyFont">地理信息</el-menu-item>
        <el-menu-item index="/FacilityFont">设施信息</el-menu-item>
        <el-menu-item index="/EnvironmentFont">环境信息</el-menu-item>
        <el-menu-item index="/StatictsInfo">图表统计</el-menu-item>
        <div class="flex-grow" />
        <el-sub-menu index="2-4">
          <template #title>
            <el-avatar :src="user.avatar"></el-avatar>
          </template>
          <el-menu-item v-if="authShow('ADMIN')"  index="/EndPage">后台管理</el-menu-item>
          <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>

        </el-sub-menu>

      </el-menu>
    </el-affix>
    <router-view />
  </div>
</template>

<script>
import {logout, systemCurrentUser} from "@/api/api";
import {removeItem} from "@/utils/storage";
import router from "@/router";
import {authShow} from "@/utils/authutil";

export default {
  name: "FontPage",
  data(){
    return{
      user: {}
    }
  },
  methods:{
    authShow,
    userQuery() {
      systemCurrentUser()
          .then((resp) => {
            this.user = resp.data.data
          })
    },

    logout() {
      logout().then(() => {
        removeItem("TOKEN_INFO_KEY")
        router.push({path: '/login'})
      })
    }
  },
  mounted() {
    this.userQuery()
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>