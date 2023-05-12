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
        <el-menu-item ><div style="color: green;font-size: 20px;font-weight: bold">线上个性化租房系统</div></el-menu-item>
        <el-menu-item index="/IndexPage">首页</el-menu-item>
        <el-menu-item index="/SearchShop">房源搜索</el-menu-item>
        <el-menu-item index="/PublishHours">房源发布</el-menu-item>
        <el-menu-item index="/OnlineConsultation">咨询列表</el-menu-item>


        <el-menu-item index="/PersonalCenter">我的主页</el-menu-item>
        <div class="flex-grow" />
        <el-sub-menu index="2-4">
          <template #title>
            <el-avatar :src="user.avatar"></el-avatar>
          </template>
          <el-menu-item index="/PersonalCenter">我的主页</el-menu-item>
          <el-menu-item v-if="authShow('ADMIN')"  index="/UserManagement">后台管理</el-menu-item>
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