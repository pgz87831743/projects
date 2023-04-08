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
         <el-menu-item ><div style="color: green;font-size: 20px;font-weight: bold">疫情互助系统</div></el-menu-item>
         <div class="flex-grow" />
         <el-sub-menu index="2-4">
           <template #title>
             <el-avatar :src="user.avatar"></el-avatar>
           </template>
           <el-menu-item index="/PersonalCenter">我的主页</el-menu-item>
           <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>

         </el-sub-menu>

       </el-menu>
     </el-affix>
   </div>
   <div class="mean2">
     <el-row :gutter="10">
       <el-col :span="3">
         <el-menu
             class="el-menu-vertical-demo"
             router
             :default-active="$route.fullPath"
         >
          <el-sub-menu>
            <template #title>
              账号管理
            </template>
            <el-menu-item index="/UserManagement">用户管理</el-menu-item>
            <el-menu-item index="/DoctorManagement">医生管理</el-menu-item>
          </el-sub-menu>
           <el-menu-item index="/DrugHelp">药品求助管理</el-menu-item>
           <el-menu-item index="/Goods">物资管理</el-menu-item>
           <el-menu-item index="/PaidHelp">有偿求助管理</el-menu-item>
           <el-menu-item index="/Exchange">交流论坛管理</el-menu-item>
           <el-menu-item index="/Antigen">自主检测管理</el-menu-item>
           <el-menu-item index="/NucleicAcid">核酸记录管理</el-menu-item>
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
