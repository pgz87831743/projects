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
        <el-menu-item ><div style="color: #c506f0;font-size: 20px;font-weight: bold">虚拟机活动开发</div></el-menu-item>
        <el-menu-item index="/IndexPage">首页</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>

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