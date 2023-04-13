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
          <div style="color: white;font-size: 20px;font-weight: bold">莱西市城建档案信息查询</div>
        </el-menu-item>
        <el-menu-item v-if="span.show" index="" @click="feachHandle('left')">
          <el-icon>
            <Fold/>
          </el-icon>
        </el-menu-item>
        <el-menu-item v-if="!span.show" index="" @click="feachHandle('right')">
          <el-icon>
            <Expand/>
          </el-icon>
        </el-menu-item>
        <div class="flex-grow"/>

        <el-menu-item index="">
          <el-icon><User /></el-icon>
          <template #title>管理员</template>
        </el-menu-item>

        <el-menu-item index="">
          <el-icon><Bell /></el-icon>
          <template #title></template>
        </el-menu-item>

        <el-menu-item index="">
          <el-icon><HomeFilled /></el-icon>
          <template #title></template>
        </el-menu-item>

        <el-menu-item index="">
          <template #title>
              <span @click="logout"> 退出登录</span>
          </template>
        </el-menu-item>





<!--        <el-sub-menu index="2-4">-->
<!--          <template #title>-->
<!--            <el-avatar :src="user.avatar"></el-avatar>-->
<!--          </template>-->
<!--          <el-menu-item index="/PersonalCenter">我的主页</el-menu-item>-->
<!--          <el-menu-item index="/login" @click="logout">退出登录</el-menu-item>-->
<!--        </el-sub-menu>-->
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
            <el-menu-item index="/Staging">
              <el-icon>
                <Monitor/>
              </el-icon>
              <template #title>工作台</template>
            </el-menu-item>

            <el-menu-item index="/EntryForm">
              <el-icon>
                <Collection/>
              </el-icon>
              <template #title>案卷著录单</template>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="span.right">
          <div class="tdiv">
            <el-tag
                v-for="tag in tags"
                :key="tag.name"
                class="tcs"
                size="large"
                :style="{color:tag.color}"
                :closable="tag.closeAble"
            >
              {{ tag.name }}
            </el-tag>
          </div>
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
import {Bell, Collection, Expand, Fold, HomeFilled, Monitor, User} from "@element-plus/icons-vue";

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
  components: {User, HomeFilled, Bell, Expand, Fold, Collection, Monitor},
  methods: {
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

  ::v-deep(.el-tag .el-tag__close) {
    color: black;
    //background: white;
  }

  .tcs {
    background: white;
    color: #252933;
    border: none;
    margin: 10px 10px 0 0;
    min-width: 90px;
    font-size: 14px;
  }

  .tdiv {
    min-height: 50px;
    margin: 10px 20px;
  }


  .el-menu {
    height: 94vh;
    //border-right: 1px lavender solid;
    background: #2a374a;
  }

  .el-menu-item {
    color: white;
  }


  .el-menu-item:hover {
    background: #2a374a;
    color: white;
  }

  .el-menu-item.is-active {
    background: #5b6476;
    color: white;
  }

  .el-card {
    height: 83vh;
    overflow: auto;
  }

}


.mean1 {
  .el-menu {
    height: 6vh;
    background: #2D7BCF;
    border: none;

    .el-menu-item {
      color: white;
      border-right: 1px rgba(255,255,255,0.17) solid;

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
