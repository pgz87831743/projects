<template>
  <div>
    <el-affix>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
          :default-active="$route.fullPath"
      >
        <el-menu-item>
          <div style="font-size: 20px;">NOW UI KIT PRO</div>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="/IndexPage">HOME</el-menu-item>
        <el-menu-item index="/FacilityAndAppointment">FACILITY & APPOINTMENT</el-menu-item>
<!--        <el-menu-item index="/TimetableF">TIMETABLE</el-menu-item>-->
<!--        <el-menu-item index="/MemberShip">MEMBERSHIP</el-menu-item>-->
        <el-menu-item index="/Contactus">CONTACTUS</el-menu-item>
        <el-menu-item index="/MyHomePage">
          <el-avatar :size="56"
                     :src="user.avatar"/>
        </el-menu-item>
      </el-menu>
    </el-affix>
    <router-view></router-view>
    <!--    <div class="hdv2">-->
    <!--      <span class="hdv2-span">CREATIVE TIM</span>-->
    <!--      <span class="hdv2-span">ABOUT US</span>-->
    <!--      <span class="hdv2-span">BLOG</span>-->
    <!--      <span class="hdv2-span">2019,Designed by<span class="sc">Invision</span>.Code by <span class="sc">Creative Tim</span>. Presented by <span class="sc">MockPlus RP</span></span>-->
    <!--    </div>-->
  </div>
</template>

<script>
import {sysUserApi} from "@/api/api";
import {getUser} from "@/utils/authutil";

export default {
  name: "FontPage",
  data() {
    return {
      user: {}
    }
  },
  methods: {

    initUser() {
      sysUserApi.getById(getUser().id)
          .then((resp) => {
            this.user = resp.data.data
          })
    }

  },
  mounted() {
    this.initUser()
  }
}
</script>

<style scoped>


::v-deep(.el-menu-item.is-active) {
  border-bottom: 2px solid #e0592d !important;
  color: #e0592d !important;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #e0592d !important;
}


.flex-grow {
  flex-grow: 1;
}
</style>