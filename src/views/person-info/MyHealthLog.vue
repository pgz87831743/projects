<template>
  <div class="div">
    <div>
      <el-card shadow="hover" class="box-card">
        <template #header>
          <span class="pin-lun">我的健康日志</span>
        </template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="content" label="日志内容"/>
          <el-table-column prop="sleepTime" label="睡眠时间"/>
          <el-table-column prop="mood" label="心情"/>
          <el-table-column prop="smoke" label="抽烟"/>
          <el-table-column prop="weight" label="体重"/>
          <el-table-column prop="pressure" label="压力"/>
          <el-table-column prop="bpH" label="高压"/>
          <el-table-column prop="dbL" label="底压"/>
          <el-table-column prop="bloodSugar" label="血糖"/>
          <el-table-column prop="eatFood" label="吃的食物"/>
          <el-table-column prop="createTime" label="创建时间"/>
          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="deleteById(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>


  </div>
</template>

<script>


import {healthLogsApi, systemCurrentUser, sysUserApi} from "@/api/api";
import {getUser} from "@/utils/authutil";

export default {
  name: "UserIfoDetail",

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
            window.location.href = '/PersonalCenter'
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

.upload-demo {
  margin-top: 24px;
  margin-left: 10px;
}
</style>