<template>
  <div class="dv1">
    <div class="login">

      <el-card shadow="hover">
        <img style="margin: 60px 0" :src="require('@/assets/ImageAvatar.png')">
        <el-form>
          <el-form-item >
            <el-input   :prefix-icon="User"  v-model="user.username" size="large" placeholder="Account"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input  :prefix-icon="Lock" v-model="user.password"   size="large" placeholder="password"></el-input>
          </el-form-item>
        </el-form>

        <el-button @click="loginHandler" style="width: 50%;margin-top: 30px; border-radius: 30px;width: 100%;height:38px;color: #ffffff;background: #f96332"> Get Started</el-button>
        <span >
            <el-link style="color: #ffffff" :underline="false" href="/register" target="_blank"> CREATE ACCOUNT</el-link>
        </span>
        <span style="width: 50%;display:inline-block;text-align: right;margin-top: 20px; color: #ffffff">
          <el-link style="color: #ffffff" :underline="false"> NEED HELP?</el-link>
        </span>
      </el-card>

    </div>
  </div>
</template>


<script>

import {login, systemCaptcha, sysUserRegister} from "@/api/user";
import {useStore} from 'vuex'
import router from "@/router";
import {Lock,User} from "@element-plus/icons-vue";


export default {
  name: "LoginPage",
  computed: {
    Lock() {
      return Lock
    },
    User(){
      return User
    }
  },

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


    loginHandler(){
      router.push({path: '/IndexPage'})
    },

    formSubmit() {
      sysUserRegister(this.form)
          .then(() => {
            this.dialog.dialogFormVisible = false
            this.user.username=this.form.username
            this.user.password=this.form.password
            this.onsubmit()
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
    systemCaptcha().then((resp)=>{
      this.user=resp.data.data()
    })
  },

}
</script>


<style lang="scss" scoped>

::v-deep(input::-webkit-input-placeholder) { color: #ffffff; }
::v-deep(input::-ms-input-placeholder) { color: #ffffff; }

::v-deep(.el-icon){
  color: #ffffff;
}

::v-deep(.el-card){
  background: rgba(255,255,255,0.1);
  border: none;
}

::v-deep(.el-input__wrapper){
  background: #b49997;
  border-radius: 30px;
}

.dv1{
  height: 100vh;
  background:url("@/../src/assets/login.png");
  position: relative;

  .login{
    position: absolute;
    height: 600px;
    width: 400px;
    margin: 0 auto;
    top: 130px;
    bottom: 0;
    left: 0;
    right: 0;

    //background: #666666;
  }


}


</style>
