<template>
  <div>
   <div class="mean1">
       <el-menu
           class="el-menu-demo"
           mode="horizontal"
           :ellipsis="false"
           router
           :default-active="$route.fullPath"
       >
         <el-menu-item ><div style="color: white;font-size: 20px;font-weight: bold">莱西市城建档案信息查询</div></el-menu-item>
         <div class="flex-grow" />
         <el-sub-menu index="2-4">
           <template #title>
             <el-avatar :src="user.avatar"></el-avatar>
           </template>
           <el-menu-item index="/PersonalCenter">我的主页</el-menu-item>
           <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>
         </el-sub-menu>
       </el-menu>

   </div>
   <div class="mean2">
     <el-row>
       <el-col :span="3">
         <el-menu
             class="el-menu-vertical-demo"
             router
             :default-active="$route.fullPath"
         >
           <el-menu-item index="/UserManagement">
             <el-icon><Monitor /></el-icon>
             <template #title>工作台</template>
           </el-menu-item>

           <el-menu-item index="/EntryForm">
             <el-icon><Collection /></el-icon>
             <template #title>案卷著录单</template>
           </el-menu-item>
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
import {Collection, Monitor} from "@element-plus/icons-vue";

export default {
  name: "EndPage",
  data() {
    return {
      user: {}
    }
  },
  components: {Collection, Monitor},
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
  height: 94vh;
  //border-right: 1px lavender solid;
  background: #2a374a;
}

.mean1 .el-menu {

  height: 6vh;

  .flex-grow {
    flex-grow: 1;
  }
}


.el-menu--horizontal{
  background: #2e7bcd;
  border-bottom:none;
}


.el-menu-item{
  color: white;
}


.el-menu-item:hover{
  color:  #2e7bcd;
  background: white;
}

.is-active{
  color:  #2e7bcd;
  background: white;
}


.el-card{
  height: 83vh;
  overflow: auto;
}


</style>
