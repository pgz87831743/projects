<template>
  <div>
    <div class="hdv1">
      <div class="hdv1_1">
       <el-row>
         <el-col>
           <el-avatar :size="300" src="http://p2.music.126.net/vZ5ef3WzRneTTydXSzPauQ==/109951165994871935.jpg?param=380y140" />
         </el-col>
       </el-row>
        <el-row style="margin-top: 60px">
          <el-col>
            123123
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="5">
          <el-menu
              class="el-menu-vertical-demo"
              router
              :default-active="$route.fullPath"
          >
            <el-menu-item index="/MyHomePage">
              Home
            </el-menu-item>
            <el-menu-item index="/MyOrder">
              My Order
            </el-menu-item>
            <el-menu-item index="2">
              Membership
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <router-view></router-view>
        </el-col>
      </el-row>
      <div class="hdv2">
        <span class="hdv2-span">CREATIVE TIM</span>
        <span class="hdv2-span">ABOUT US</span>
        <span class="hdv2-span">BLOG</span>
        <span class="hdv2-span">2019,Designed by<span class="sc">Invision</span>.Code by <span class="sc">Creative Tim</span>. Presented by <span class="sc">MockPlus RP</span></span>
      </div>
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

.sc{
  color: #e0592d;
}

.hdv2-span{
  color: #ffffff;
  display: inline-block;
  padding: 30px;
}

.hdv2{
  height: 80px;
  background: #333333;
}

.el-menu-vertical-demo{
  height: 70vh;
  *{
    font-size: 30px;
  }
}

.hdv1{
  height: 662px;
  background:url("@/../src/assets/od_1.png");
  color: #ffffff;
  font-size: 36px;
  position: relative;

  .hdv1_1{

    position: absolute;
    left: 0;
    right: 0;
    top: 163px;
    bottom: 0;
  }
}
</style>