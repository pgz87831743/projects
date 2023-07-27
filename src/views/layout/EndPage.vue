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
          <div style="color: white;font-size: 20px;font-weight: bold">车位租赁管理系统</div>
        </el-menu-item>
        <div class="flex-grow"/>


        <el-menu-item index="">
          <el-icon>
            <User/>
          </el-icon>
          <template #title>{{ getUser().username }}</template>
        </el-menu-item>

<!--        <el-menu-item index="/IndexPage">-->
<!--          <template #title>前台</template>-->
<!--        </el-menu-item>-->


        <el-menu-item index="/login" @click="logout">
          <template #title>退出登录</template>
        </el-menu-item>


      </el-menu>

    </div>
    <div class="mean2">
      <el-row>
        <el-col :span="span.left">
          <el-menu
              class="el-menu-vertical-demo"
              router
              :collapse="span.collapse"
              :collapse-transition="false"
              :default-active="$route.fullPath"
          >
            <el-menu-item index="/ParkingPlace">车位管理</el-menu-item>
            <el-menu-item index="/History">历史租车位</el-menu-item>
            <el-menu-item index="/Feedback">业主反馈</el-menu-item>
            <el-menu-item index="/OwnersRentingCars">业主租车位</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="span.right">
          <div class="div">
            <el-card shadow="hover">
              <router-view/>
            </el-card>
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
import {User} from "@element-plus/icons-vue";
import {authShow, getUser} from "@/utils/authutil";

export default {
  name: "EndPage",
  data() {
    return {
      span: {
        left: 3,
        right: 21,
        collapse: false,
        show: true
      },
      user: {},
      tags: [
        {name: '首页', path: 'UserManagement', closeAble: true, color: '#2D7BCF'},
      ]
    }
  },
  components: {User},
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

    feachHandle(type) {
      if (type === 'right') {
        this.span.collapse = false
        this.span.right = 21
        this.span.left = 3
        this.span.show = true
      } else {
        this.span.collapse = true
        this.span.right = 23
        this.span.left = 1
        this.span.show = false
      }
    },

  },


  mounted() {
    this.userQuery()
  },

}
</script>


<style lang="scss" scoped>

.mean2 {


  .tdiv {
    min-height: 50px;
    margin: 10px 20px;
  }

  .el-card {
    height: 83vh;
    overflow: auto;
  }

  .el-menu {
    height: 94vh;
    border: none;

  }


}


.mean1 {
  .el-menu {
    height: 6vh;
    background: #2D7BCF;
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
      background: #296cb7;
    }

    .flex-grow {
      flex-grow: 1;
    }
  }


}


</style>
