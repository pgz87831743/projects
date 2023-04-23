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
<!--            MANAGER,-->
<!--            USER,-->
<!--            EMPLOYEE;-->

            <el-menu-item v-show="authShow(['USER','MANAGER','EMPLOYEE'])" index="/MyHomePage">INFOMATION</el-menu-item>
            <el-menu-item v-show="authShow(['USER','EMPLOYEE'])" index="/Appointment">APPOINTMENT</el-menu-item>
            <el-menu-item v-show="authShow(['USER','EMPLOYEE'])" index="/MyOrder">ORDER</el-menu-item>
            <el-menu-item v-show="authShow(['USER','EMPLOYEE'])" index="/MemberShip">MEMBER CENTER</el-menu-item>
            <el-menu-item v-show="authShow(['USER','EMPLOYEE'])" index="/MembershipInfo">MEMBERSHIP</el-menu-item>
            <el-menu-item v-show="authShow(['MANAGER'])" index="/Stadium">STADIUM</el-menu-item>
            <el-menu-item v-show="authShow(['MANAGER'])" index="/Activity">ACTIVITY</el-menu-item>
            <el-menu-item v-show="authShow(['MANAGER'])" index="/Timetable">TIMETABLE</el-menu-item>
            <el-menu-item v-show="authShow(['USER','MANAGER','EMPLOYEE'])" index="/MyHomeEdit">SETTINGS</el-menu-item>
            <el-menu-item v-show="authShow(['MANAGER'])" index="/StatisticsInfo">STATISTICS</el-menu-item>
            <el-menu-item v-show="authShow(['USER','MANAGER','EMPLOYEE'])" index="/login" @click="logout">LOGINOUT</el-menu-item>
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

import {logout} from "@/api/api";
import {removeItem} from "@/utils/storage";
import router from "@/router";
import {authShow} from "@/utils/authutil";

export default {
  name: "PersonalCenter",
  data() {
    return {
      isMemberShip: false
    }
  },
  methods: {
    authShow,



    logout() {
      logout().then(() => {
        removeItem("TOKEN_INFO_KEY")
        router.push({path: '/login'})
      })
    }

  },
  mounted() {

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