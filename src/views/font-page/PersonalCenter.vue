<template>
  <div class="div">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-menu
              class="el-menu-vertical-demo"
              :default-active="$route.fullPath"
              router
          >
            <el-menu-item index="/UserIfoDetail">
              <span>个人信息</span>
            </el-menu-item>
            <el-menu-item index="/MyHealthLog">
              <span>我的健康日志</span>
            </el-menu-item>
            <el-menu-item index="MyOrder">
              <span>我的订单</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>



  </div>
</template>

<script>


import {healthLogsApi, systemCurrentUser, sysUserApi} from "@/api/api";
import {getUser} from "@/utils/authutil";

export default {
  name: "PersonalCenter",

  data() {
    return {
      search: "",
      form: {
        name: "",
        sex: "",
        avatar: ""
      },
      disabled: true,
      list: [],
      tableData: []
    }
  },
  methods: {
    getUser,

    handleAvatarSuccess(response) {
      this.form.avatar = response[0].url
    },

    initUserInfo() {
      systemCurrentUser()
          .then((resp) => {
            this.form = resp.data.data
          })
    },

    deleteById(row) {
      healthLogsApi.deleteById(row.id)
          .then(()=>{
            this.initTableList()
          })
    },


    saveUserInfoHandle() {
      sysUserApi.updateById(this.form)
          .then(() => {
            window.location.href = '/UserIfoDetail'
          })
    },
    initTableList() {
      healthLogsApi.listAllUser()
          .then((resp) => {
            this.tableData = resp.data.data
          })
    }
  },
  mounted() {
    this.initUserInfo()
    this.initTableList()
  }
}
</script>

<style scoped lang="scss">
::v-deep(.box-card .el-card__header) {
  //border: none;
}

.box-card {
  min-height: 80vh;
}

::v-deep(.div-form) {

}

.card-div {
  //background: aqua;
  height: 35px;
  margin-top: 10px;

  div {
    display: inline-block;
    float: left;
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }

  div:nth-child(n+2) {
    float: right;
    margin: 0 5px;
  }

}

.el-menu {
  height: 94vh;
  border: none;

}

.upload-demo {
  margin-top: 24px;
  margin-left: 10px;
}
</style>