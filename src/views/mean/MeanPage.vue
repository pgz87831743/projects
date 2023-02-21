<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="5">
            校园社交系统后台
          </el-col>
          <el-col :span="19">
            您好:{{ user.data.username }}
            <el-button type="success" @click="logout">退出登录</el-button>
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

<!--            <el-sub-menu index="1">-->
<!--              <template #title>-->
<!--                <span>系统管理</span>-->
<!--              </template>-->
<!--              <el-menu-item index="/MeanPage/UserManage">用户管理</el-menu-item>-->
<!--              <el-menu-item index="/MeanPage/RoleManage">角色管理</el-menu-item>-->
<!--              <el-menu-item index="/MeanPage/AuthorityManage">权限管理</el-menu-item>-->
<!--            </el-sub-menu>-->

            <el-menu-item index="/MeanPage/Cwda">新闻管理</el-menu-item>
            <el-menu-item index="/MeanPage/Mrjl">留言管理</el-menu-item>
            <el-menu-item index="/MeanPage/Zhgl">运动打卡</el-menu-item>
            <el-menu-item index="/MeanPage/Syjq">相约运动</el-menu-item>




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
    }
  },
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.el-header {
  background: black;
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

.el-aside {
  height: 100vh;
  border-right: black 1px solid;
}

.el-main {
  background: #f5f5f5;
}
</style>
