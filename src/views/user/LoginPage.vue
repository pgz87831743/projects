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
            <el-input  :prefix-icon="Lock" v-model="user.password" type="password"  show-password   size="large" placeholder="password"></el-input>
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

import {login, systemCaptcha} from "@/api/api";
import {useStore} from 'vuex'
import router from "@/router";
import {User,Lock,View} from "@element-plus/icons-vue";


export default {
  name: "LoginPage",
  computed: {
    User() {
      return User
    },
    Lock() {
      return Lock
    },
    View() {
      return View
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
        password: '',
        code:'',
        uuid:'',
        userCode:'',
      }
    }
  },
  components: {},
  methods: {

    registerHandler(){
      router.push({path: '/register'})
    },

    changeCapHandler(){
      systemCaptcha().then((resp) => {
        let data= resp.data.data
        this.user.code=data.code
        this.user.uuid=data.uuid
      })
    },

    loginHandler() {
      login(this.user).then((resp => {
        if (resp.data.code === 200) {
          this.store.commit('setUser', resp.data.data)
          router.push({path: '/IndexPage'})
        }
      }))
    },
  },
  mounted() {

    systemCaptcha().then((resp) => {
      this.user = resp.data.data;
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
