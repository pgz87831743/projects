<template>
  <div>
    <el-row>
      <div style="background: #4a8aff;height: 80px;width: 100%">

      </div>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-menu
            class="el-menu-vertical-demo"
            router
            default-active="/UserManagement"
        >
          <el-menu-item index="/UserManagement">用户管理</el-menu-item>
          <el-menu-item index="/RoleManagement">角色管理</el-menu-item>
          <el-menu-item index="/AuthorityManagement">权限管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>


<script>

export default {
  name: "EndPage",
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.el-menu{
  height: 100vh;
  border-right: 1px lavender solid;
}
</style>
