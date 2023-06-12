<template>
  <div>
    <div class="mean1">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
          :collapse-transition="false"
          :default-active="$route.fullPath"
      >
        <el-menu-item index="">
          <div style="color: white;font-size: 20px;font-weight: bold">疑似未成年被侵害上报系统</div>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="">
          <el-avatar :src="avt"></el-avatar>
          &nbsp;
          <template #title>{{ getUser().nickname }}</template>
        </el-menu-item>
        <el-menu-item index="/login" @click="logout">
          <template #title>退出登录</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="mean2">
      <el-row>
        <el-col :span="3">
          <el-menu
              class="el-menu-vertical-demo"
              router
              :collapse-transition="false"
              :default-active="$route.fullPath"
          >
            <el-menu-item index="/IndexPage"><el-icon><HomeFilled /></el-icon>首页</el-menu-item>
            <el-menu-item v-if="authShow(['ADMIN'])" index="/DeptManage"><el-icon><OfficeBuilding /></el-icon>单位管理</el-menu-item>
            <el-menu-item v-if="authShow(['ADMIN'])" index="/UserManage"><el-icon><User /></el-icon>用户管理</el-menu-item>
            <el-menu-item index="/DataQuery"><el-icon><Search /></el-icon>数据查询</el-menu-item>
            <el-menu-item index="/Visualization"><el-icon><DataAnalysis /></el-icon>可视化大屏</el-menu-item>

          </el-menu>
        </el-col>
        <el-col :span="21">
          <div class="div">
            <router-view/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>

import {logout, systemCurrentUser} from "@/api/api";
import {removeItem} from "@/utils/storage";
import router from "@/router";

import {authShow, getUser} from "@/utils/authutil";
import {DataAnalysis, HomeFilled, OfficeBuilding, Search, User} from "@element-plus/icons-vue";

export default {
  name: "EndPage",
  components: {OfficeBuilding, User, DataAnalysis, Search, HomeFilled},
  data() {
    return {
      avt:require("@/assets/1.png")
    }
  },
  methods: {
    authShow,
    getUser,
    userQuery() {
      systemCurrentUser()
          .then((resp) => {
            this.user = resp.data.data
          })
    },

    logout() {
      logout().then(() => {
        removeItem("TOKEN_INFO_KEY")
        router.push({path: '/login'})
      })
    },


  },


  mounted() {
    this.userQuery()
  },

}
</script>


<style lang="scss" scoped>


.mean1 {
  .el-menu {
    height: 6vh;
    background: linear-gradient(to right, #0064ed ,#029aed);
    border: none;
    .el-menu-item {
      color: white;
      //border-right: 1px rgba(255,255,255,0.17) solid;

    }

    .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      background: #296cb7;
      color: white;
    }


    .el-menu-item:hover {
      background: unset;
    }

    .el-menu-item.is-active {
      background: unset;
    }

    .flex-grow {
      flex-grow: 1;
    }
  }

}
.mean2 {

  .tdiv {
    min-height: 50px;
    margin: 10px 20px;
  }

  .el-card {
    height: 83vh;
    overflow: auto;
  }

  .el-menu-item{
    color: #AAB9CD;
  }

  .el-menu-item:hover{
    color: white;
    background-color: unset;
  }

  .el-menu-item.is-active {
    color: white;
    background-color: #182434;
  }

  .el-menu {
    height: 94vh;
    border: none;
    background-color: #2e3f55;
  }


}
</style>
