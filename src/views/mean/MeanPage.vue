<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="5">
            培训信息维护后台
          </el-col>
          <el-col :span="5" :offset="14">
            您好:{{ user.data.username }}
            <el-button type="success" @click="logout">退出登录</el-button>
          </el-col>

        </el-row>
      </el-header>
      <el-container>
        <el-aside width="10%">
          <el-menu
              :router="true"
              default-active="/MeanPage/ReportForms"
              class="el-menu-vertical-demo"
          >
            <el-menu-item index="/MeanPage/ReportForms">培训信息维护报表</el-menu-item>

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
  background: #dcadad;
  color: white;
  text-align: left;
  font-size: 30px;
  line-height: 60px;
}

::v-deep header > div > div:nth-child(2) {
  color: #079557;
  font-size: 16px;
  text-align: right;
}

.el-aside {
  height: 100vh;

}

::v-deep aside {

 ul{
   border-right: none;
 }

}



::v-deep .el-main {
  background: #f5f5f5;
  border-right: none;
}
</style>
