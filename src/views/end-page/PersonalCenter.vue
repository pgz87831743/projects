<template>
  <div class="div">
    <div>
      <el-row :justify="'center'">
        <el-col :span="18">
          <el-form class="div-form" model="form" :disabled="disabled" label-width="100px">
            <el-form-item label="用户名">
              <el-input v-model="form.username" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="form.nickname" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="角色">
              <span v-if="form.role==='ADMIN'">管理员</span>
              <span v-if="form.role==='USER'">用户</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="6">
          <el-button type="success" @click="disabled=false">编辑</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="saveUserInfoHandle">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


import {systemCurrentUser, sysUserApi} from "@/api/api";
import {getUser} from "@/utils/authutil";

export default {
  name: "PersonalCenter",

  data() {
    return {
      search: "",
      form: {
        deptInfo:{

        }
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



    saveUserInfoHandle() {
      sysUserApi.updateById(this.form)
          .then(() => {
            window.location.href = '/PersonalCenter'
          })
    },

  },
  mounted() {
    this.initUserInfo()
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