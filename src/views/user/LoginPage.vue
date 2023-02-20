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
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>


<script>

import router from "@/router";
import {useStore} from "vuex"

export default {
  name: "LoginPage",

  setup() {
    const store = useStore()
    return {
      state: store.state,
      changeUser(args) {
        store.dispatch("changeUser",args)
      }
    }
  },

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
              this.changeUser((resp.data.data))
              router.push({path: 'TabsPage'})
            }
          });

    },
    sendVerifyCode() {
      this.$http.get('register/verify?email=' + this.ruleForm.username)

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
  width: 250px;
  margin: 100px auto;

  .el-form-item {
    margin-top: 30px;
  }
}
</style>
