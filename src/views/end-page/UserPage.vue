<template>
  <div class="p-div" style="font-weight: bold;">
    <el-row gutter="20">
      <el-col :span="18">
        <el-card shadow="hover">
          <h1 style="text-align: center">个人信息</h1>
          <el-form :model="oldForm" label-position="right" label-width="150px" :disabled="true">
            <el-form-item label=" " >
              <el-avatar :size="300" :src="oldForm.avatar" />
            </el-form-item>
            <el-form-item label="用户名"><el-input v-model="oldForm.username"/></el-form-item>
            <el-form-item label="密码"><el-input v-model="oldForm.password"/></el-form-item>
            <el-form-item label="姓名"><el-input v-model="oldForm.nickname"/></el-form-item>
            <el-form-item label="性别"><el-input v-model="oldForm.sex"/></el-form-item>
            <el-form-item label="手机"><el-input v-model="oldForm.phone"/></el-form-item>
            <el-form-item label="邮箱"><el-input v-model="oldForm.email"/></el-form-item>
            <el-form-item label="年龄"><el-input v-model="oldForm.age"/></el-form-item>
            <el-form-item label="身份证号"><el-input v-model="oldForm.idCard"/></el-form-item>
          </el-form>
          <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
            <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
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
              <el-form-item label="头像地址">
                <el-input v-model="form.avatar"/>
              </el-form-item>
              <el-form-item label="用户名"><el-input v-model="form.username"/></el-form-item>
              <el-form-item label="密码"><el-input v-model="form.password"/></el-form-item>
              <el-form-item label="姓名"><el-input v-model="form.nickname"/></el-form-item>
              <el-form-item label="性别"><el-input v-model="form.sex"/></el-form-item>
              <el-form-item label="手机"><el-input v-model="form.phone"/></el-form-item>
              <el-form-item label="邮箱"><el-input v-model="form.email"/></el-form-item>
              <el-form-item label="年龄"><el-input v-model="form.age"/></el-form-item>
              <el-form-item label="身份证号"><el-input v-model="form.idCard"/></el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer" v-if="!dialog.formDisabled">
        <el-button   @click="dialog.dialogFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="formSubmit">确认</el-button>
      </span>
            </template>
          </el-dialog>
          <el-button  type="primary" @click="clickButton" >修改</el-button>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>


<script>

import {sysUserGetById, sysUserUpdateById} from "@/api/user";
import {getItem} from "@/utils/storage";

export default {
  name: "UserPage",
  data() {
    return {
      passwordForm: {
        oldPassWord: '',
        newPassWord: '',
        newCheck: '',
      },
      form: {},
      oldForm: {},
      dialog: {},
      fileList: []
    }
  },
  components: {},
  methods: {


    fileSuccess(response) {
      this.form.avatar=response[0].url
      this.fileList=[response[0]]
    },
    handleRemove() {
      this.fileList=[]
      this.form.avatar = ''
    },


    dialogClose() {
      this.form = {}
      this.oldFormQuery()
    },


    oldFormQuery() {
      sysUserGetById(getItem("TOKEN_INFO_KEY").user.id)
          .then((resp) => {
            this.oldForm=resp.data.data
          })
    },

    formSubmit() {
      sysUserUpdateById(this.form)
          .then(() => {
            this.dialog.dialogFormVisible = false
            window.location.href='/UserPage'
          })
    },
    clickButton() {
      sysUserGetById(getItem("TOKEN_INFO_KEY").user.id).then((resp) => {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '修改'
        this.dialog.formDisabled = false
        this.dialog.isAdd = false
        this.form = resp.data.data
      })
    },
  },
  mounted() {
    this.oldFormQuery()
  },

}
</script>


<style lang="scss" scoped>

</style>
