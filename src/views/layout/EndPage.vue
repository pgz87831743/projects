<template>
  <div>
    <el-affix >
    <div
        style="color: green;background: #ffffff;padding-left:15px;height: 70px;width: 100%;border-bottom: 1px #f0f0f0 solid">
      <el-row>
        <el-col :span="21">
          <h3>高校数字资源后台管理</h3>
        </el-col>
        <el-col :span="3" style="padding: 15px">
          <span style=" font-size:16px;float:left;display:inline-block;line-height: 60px">您好:{{
              user.nickname
            }}</span>
          <el-popover>
            <template #reference>
              <el-avatar :size="50" :src="this.user.avatar"/>
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
    </el-affix>
    <el-row :gutter="10">
      <el-col :span="3">
        <el-menu
            class="el-menu-vertical-demo"
            router
            :default-active="$route.fullPath"
        >
          <el-menu-item index="/UserPage">首页</el-menu-item>
          <el-sub-menu>
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/UserManagement">用户管理</el-menu-item>
              <el-menu-item index="/RoleManagement">角色管理</el-menu-item>
              <el-menu-item index="/AuthorityManagement">权限管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="/endSearchResource">资源管理</el-menu-item>
          <el-menu-item index="/AuditManagement">审核管理</el-menu-item>
          <el-menu-item index="/ReportingManagement">举报管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="div">
          <el-card shadow="hover">
            <router-view></router-view>
          </el-card>
        </div>
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


</style>
