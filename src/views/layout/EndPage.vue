<template>
  <div>
   <div class="mean1">
     <el-affix >
       <el-menu
           class="el-menu-demo"
           mode="horizontal"
           :ellipsis="false"
           router
           :default-active="$route.fullPath"
       >
         <el-menu-item ><div style="color: green;font-size: 20px;font-weight: bold">健康莱西</div></el-menu-item>
         <div class="flex-grow" />
         <el-menu-item index="">你好：{{user.username}}</el-menu-item>
         <el-menu-item index="/IndexPage">主页</el-menu-item>
         <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>

       </el-menu>
     </el-affix>
   </div>
   <div class="mean2">
     <el-row >
       <el-col :span="3">
         <el-menu
             class="el-menu-vertical-demo"
             router
             :default-active="$route.fullPath"
         >
           <el-menu-item index="/Dept">医院管理</el-menu-item>
           <el-menu-item index="/UserManagement">管理员账号管理</el-menu-item>
           <el-menu-item index="/HospitalManagement">医院账号管理</el-menu-item>
           <el-menu-item index="/Means">导航菜单管理</el-menu-item>
           <el-menu-item index="/DoctorInfo">医生信息管理</el-menu-item>
         </el-menu>
       </el-col>
       <el-col :span="21">
         <div class="div">
           <el-card shadow="hover">
             <router-view/>
           </el-card>
         </div>
       </el-col>
     </el-row>
   </div>

  </div>
</template>


<script>

import {logout, systemCurrentUser} from "@/api/api";
import { removeItem} from "@/utils/storage";
import router from "@/router";

export default {
  name: "EndPage",
  data() {
    return {
      user: {}
    }
  },
  components: {},
  methods: {
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
  },

}
</script>


<style lang="scss" scoped>
.mean2 .el-menu {
  height: 100vh;
  border-right: 1px lavender solid;
}

.mean1 .el-menu {
  .flex-grow {
    flex-grow: 1;
  }
}


</style>
