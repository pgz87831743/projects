<template>
  <div class="p-div">
    <el-row gutter="20">
      <el-col :span="18">
        <el-card shadow="hover">
          <h2 style="text-align: left">个人资料</h2>
          <el-form :model="oldForm" label-position="right" label-width="150px" :disabled="true">
            <el-form-item label="头像">
              <img  :src="oldForm.avatar" style="width: 300px" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="oldForm.username"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="oldForm.password"/>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="oldForm.nickname"/>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="oldForm.sex"/>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="oldForm.phone"/>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="oldForm.email"/>
            </el-form-item>
            <el-form-item label="会员等级">
              <el-input v-model="oldForm.level"/>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="oldForm.age"/>
            </el-form-item>
          </el-form>
          <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
            <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
              <el-form-item label="用户名">
                <el-input v-model="form.username"/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password"/>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.nickname"/>
              </el-form-item>
              <el-form-item label="头像">
                <el-input v-model="form.avatar"/>
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
        <el-button type="primary" v-if="this.isAdd" @click="formSubmit">确认</el-button>
        <el-button type="primary" v-if="!this.isAdd" @click="formSubmit">确认</el-button>
      </span>
            </template>
          </el-dialog>
          <el-button  type="primary" @click="clickButton">修改</el-button>
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
      dialog: {}
    }
  },
  components: {},
  methods: {
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
