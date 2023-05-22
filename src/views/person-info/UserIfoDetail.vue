<template>
  <div class="div">
    <div>
      <el-card shadow="hover" class="box-card">
        <template #header>
          <span class="pin-lun">个人信息</span>
        </template>
        <el-row>
          <el-col>
            <el-form class="div-form" model="form" :disabled="disabled" label-width="100px">
              <el-form-item>
                <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :data="{fileTypeEnum:'FILE'}"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    name="files"
                >
                  <el-avatar
                      :src="form.avatar"
                      :size="75"
                  />
                  <el-button style="margin-left: 20px">更换头像</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="昵称：">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio-group v-model="form.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="邮箱：">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="电话：">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>

              <el-form-item label="年龄：">
                <el-input v-model="form.age"></el-input>
              </el-form-item>


              <el-form-item label="密码：">
                <el-input type="password" show-password v-model="form.password"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="6">
            <el-button @click="disabled=false">编辑</el-button>
          </el-col>
          <el-col :span="6">
            <el-button @click="saveUserInfoHandle">保存</el-button>
          </el-col>
        </el-row>
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