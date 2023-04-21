<template>
  <div>
    <el-affix >
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
          :default-active="$route.fullPath"
      >
        <el-menu-item ><div style="font-size: 20px;">NOW UI KIT PRO</div></el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/IndexPage">HOME</el-menu-item>
        <el-menu-item index="/FacilityAndAppointment">FACILITY & APPOINTMENT</el-menu-item>
        <el-menu-item index="/Timetable">TIMETABLE</el-menu-item>
        <el-menu-item index="/MemberShip">MEMBERSHIP</el-menu-item>
        <el-menu-item index="/Contactus">CONTACTUS</el-menu-item>
        <el-menu-item index="/PersonalCenter"><el-avatar :size="56" src="http://p2.music.126.net/vZ5ef3WzRneTTydXSzPauQ==/109951165994871935.jpg?param=380y140" /></el-menu-item>
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
export default {
  name: "FontPage"
}
</script>

<style scoped>



::v-deep(.el-menu-item.is-active){
  border-bottom: 2px solid #e0592d !important;
  color: #e0592d!important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
  color: #e0592d !important;
}


.flex-grow {
  flex-grow: 1;
}
</style>