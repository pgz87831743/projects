<template>
  <div class="m-div">
    <div class="m-form-div">
      <el-row justify="center">
        <el-col :span="6">
          <el-card>
            <h1 class="p-color">助农小额贷款系统</h1>
            <el-form ref="form" :model="user" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="user.password"></el-input>
              </el-form-item>
            </el-form>
            <div>
              <el-button @click="onsubmit">登录</el-button>
              <el-button @click="clickButton">注册</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-model="dialog.dialogFormVisible" title="新用户注册" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"/>
        </el-form-item>
        <el-form-item label="头像地址">
          <el-input v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-upload
              class="upload-demo"
              drag
              :model:file-list="fileList"
              :action="this.$request.defaults.baseURL+'file/upload'"
              :show-file-list="true"
              name="files"
              :on-remove="handleRemove"
              :on-success="fileSuccess"
              :data="{fileTypeEnum:'FILE'}"
          >
            <div class="el-upload__text">
              <em>点击上传头像</em>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="性别">
          <el-input v-model="form.sex"/>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-input v-model="form.level"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer" v-if="!dialog.formDisabled">
        <el-button @click="dialog.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="formSubmit">确认</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>


<script>

import {login, sysUserAdd} from "@/api/user";
import {useStore} from 'vuex'
import router from "@/router";


export default {
  name: "LoginPage",

  setup() {
    return {
      store: useStore()
    }
  },

  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      form: {},
      dialog: {},
      fileList: []
    }
  },
  components: {},
  methods: {

    formSubmit() {
      sysUserAdd(this.form)
          .then(() => {
            this.dialog.dialogFormVisible = false

          })
    },

    clickButton() {
      this.dialog.dialogFormVisible = true
    },

    fileSuccess(response) {
      this.form.avatar = response[0].url
      this.fileList = [response[0]]
    },
    handleRemove() {
      this.fileList = []
      this.form.avatar = ''
    },


    dialogClose() {
      this.form = {}
      this.oldFormQuery()
    },


    onsubmit() {
      login(this.user).then((resp => {
        if (resp.data.code === 200) {
          this.store.commit('setUser', resp.data.data)
          router.push({path: '/UserPage'})
        }
      }))
    },
  },
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.m-div {
  height: 100vh;
  background-image: url("../../assets/pexels-pixabay-259165.jpg");
  background-size: 100%;
  background-repeat: no-repeat;

  .m-form-div {
    padding-top: 300px;

  }
}


</style>
