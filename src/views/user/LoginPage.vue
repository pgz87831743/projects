<template>
  <div class="container">
    <div class="login_div">
      <h2>培训信息维护登录界面</h2>
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="ruleForm.password" a></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="register()">注册</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>


<script>

import router from "@/router";
import {userOption} from '@/store/storage'

export default {
  name: "LoginPage",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
    }
  },
  components: {},
  methods: {
    submitForm() {
      this.$http.post('user/login', this.ruleForm)
          .then(resp => {
            if (resp.data.success) {
              userOption().setUser(resp.data)
              router.push({path: 'MeanPage'})
            }
          });

    },
    register() {
      this.$http.post('user/register', this.ruleForm)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
  },

}
</script>


<style scoped lang="scss">
.login_div {
  width: 280px;
  margin: 100px auto;

  .el-form-item {
    margin-top: 30px;
  }
}
</style>
