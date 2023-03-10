<template>
  <div>
    <div style="background: #ffffff;height: 80px;width: 100%;border-bottom: 1px #f0f0f0 solid">
      <el-row>
        <el-col :span="3">
          <h1 style="color: #2c3c9a;">XXX后台管理系统</h1>
        </el-col>
        <el-col :span="3" :offset="18" style="padding: 15px">
          <span style="color:#2c3c9a;  font-size:20px;float:left;display:inline-block;line-height: 60px">您好:{{
              user.username
            }}</span>
          <el-popover>
            <template #reference>
              <el-avatar :size="60" :src="this.user.avatar"/>
            </template>
            <template #default>
              <div style="margin: 0 auto">
                <el-button type="primary" round @click="logout">退出登录</el-button>
              </div>
            </template>
          </el-popover>

        </el-col>

      </el-row>
    </div>
    <el-row :gutter="10">
      <el-col :span="3">
        <el-menu
            class="el-menu-vertical-demo"
            router
            :default-active="$route.fullPath"
        >
          <el-menu-item index="/UserPage">首页</el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/UserManagement">用户管理</el-menu-item>
              <el-menu-item index="/RoleManagement">角色管理</el-menu-item>
              <el-menu-item index="/AuthorityManagement">权限管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>


<script>

import {logout, sysUserGetById} from "@/api/user";
import {getItem, removeItem} from "@/utils/storage";
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
      sysUserGetById(getItem("TOKEN_INFO_KEY").user.id)
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
.el-menu {
  height: 100vh;
  border-right: 1px lavender solid;
}


::v-deep .el-menu .el-menu-item:hover {
  color:  #f8f9fe ;
  background: #2c3c9a
}

::v-deep .el-menu .el-menu-item {
  color: #2c3c9a;
}

::v-deep .el-menu .is-active {

}

::v-deep .el-sub-menu > div{
  color: #2c3c9a;
}
::v-deep .el-sub-menu > div:hover{
  color:  #f8f9fe ;
  background: #2c3c9a
}

//.el-submenu ::v-deep .el-submenu__title:hover {
//  color: #2E95FB !important;
//  background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
//}


</style>
