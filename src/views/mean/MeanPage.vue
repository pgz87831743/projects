<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="5">
            <div class="co">
              校园社交系统
            </div>
          </el-col>
          <el-col :span="4" :offset="15">
            <el-row>
              <el-col :span="8">
                <span class="co"> {{ user.data.username }},你好</span>
              </el-col>
              <el-col :span="8">
                <el-button class="co" @click="logout" style="background: none">退出登录</el-button>
              </el-col>
              <el-col :span="6">
                <el-button class="co" style="background: none"  @click="indexPage">首页</el-button>
              </el-col>
            </el-row>



          </el-col>

        </el-row>
      </el-header>
      <el-container>
        <el-aside width="10%">
          <el-menu
              :router="true"
              default-active="2"
              class="el-menu-vertical-demo"
          >
            <el-menu-item index="/MeanPage/NewsManagement">新闻管理</el-menu-item>
            <el-menu-item index="/MeanPage/MessageManagement">留言管理</el-menu-item>
            <el-menu-item index="/MeanPage/SportsClocking">运动打卡</el-menu-item>
            <el-menu-item index="/MeanPage/ConcomitantMotion">相约运动</el-menu-item>
            <el-menu-item index="/MeanPage/Zhgl">账号管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main width="90%">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {userOption} from "@/store/storage";
import router from "@/router";

export default {
  name: "MeanPage",

  data() {
    return {
      user: userOption().getUser()
    }
  },

  components: {},
  methods: {
    logout() {
      userOption().setUser({})
      router.push({path: '/'})
    },
    indexPage() {
      router.push({path: '/FontPage/ShouYe'})
    }
  },
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.el-header {

  color: white;
  text-align: left;
  font-size: 30px;
  line-height: 60px;
}

::v-deep header > div > div:nth-child(2) {
  color: #42b983;
  font-size: 16px;
  text-align: right;
}

#app > div > section > section > aside > ul > li.el-menu-item.is-active{
  color: white;
  background: #2c3c9a;
  border-radius: 30px;
}

#app > div > section > section > aside > ul > li.el-menu-item{
  color: #2c3c9a;
  padding-left: 20px;
}


.el-aside {
  height: 100vh;
  border-right:none;
}

.el-main {
  background: #f5f5f5;
}
</style>
