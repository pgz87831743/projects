<template>
  <div>
    <div>
      <el-row>
        <el-col :span="4">
          <el-menu
              class="el-menu-vertical-demo"
              router
              :default-active="$route.fullPath"
          >
            <el-menu-item index="/MyHomePage">INFOMATION</el-menu-item>
            <el-menu-item index="/Appointment">APPOINTMENT</el-menu-item>
            <el-menu-item index="/MyOrder">ORDER</el-menu-item>
            <el-menu-item index="/MemberShip">MEMBER CENTER</el-menu-item>
            <el-menu-item index="/MembershipInfo">MEMBERSHIP</el-menu-item>
            <el-menu-item index="/Stadium">STADIUM</el-menu-item>
            <el-menu-item index="/Activity">ACTIVITY</el-menu-item>
            <el-menu-item index="/Timetable">TIMETABLE</el-menu-item>
            <el-menu-item index="/MyHomeEdit">SETTINGS</el-menu-item>
            <el-menu-item index="/login" @click="logout">LOGINOUT</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
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

import {logout, membershipApi} from "@/api/api";
import {removeItem} from "@/utils/storage";
import router from "@/router";

export default {
  name: "PersonalCenter",
  data() {
    return {
      isMemberShip: false
    }
  },
  methods: {

    memberShip() {
      membershipApi.isMemberShip()
          .then((resp) => {
            this.isMemberShip = resp.data.data
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
    this.memberShip()
  }
}
</script>

<style scoped lang="scss">

.el-menu {
  //height: 100vh;
  border: none;

}


.el-menu-vertical-demo {
  height: 70vh;

  * {
    font-size: 30px;
  }
}


</style>