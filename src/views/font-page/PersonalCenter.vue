<template>
  <div>
    <div>
      <el-row>
        <el-col :span="3">
          <el-menu
              class="el-menu-vertical-demo"
              router
              :default-active="$route.fullPath"
          >
            <el-menu-item index="/MyHomePage">INFOMATION</el-menu-item>
            <el-menu-item index="/MyOrder">My Order</el-menu-item>
            <el-menu-item index="/MemberShip">Membership</el-menu-item>
            <el-menu-item index="/Stadium">Stadium</el-menu-item>
            <el-menu-item index="/Activity">Activity</el-menu-item>
            <el-menu-item index="/Timetable">Timetable</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
          <div class="div">
            <el-card>
              <router-view></router-view>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "PersonalCenter",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">



.el-menu-vertical-demo{
  height: 70vh;
  *{
    font-size: 30px;
  }
}


</style>