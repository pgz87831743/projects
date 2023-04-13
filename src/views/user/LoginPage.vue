<template>
  <div>

    <div class="div1">
      <div class="divtitle">
        <img :src="img">
      </div>
      <div>
        <div class="div2">
          <div class="div3">
            <el-row justify="center">
              <el-col :span="20">
                <el-form>
                  <el-form-item>
                    <el-input  :prefix-icon="User" v-model="user.username" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input  type="password" show-password :prefix-icon="Lock" v-model="user.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                </el-form>
                <div>
                  <el-row >
                    <el-col :span="12">
                     <el-checkbox></el-checkbox>
                      <span style="color: white;font-size: 14px"> 记住登录密码</span>
                    </el-col>
                    <el-col style="text-align: right" :span="12">
                      <el-link  :underline="false"><span style="color: white;font-size: 14px">立即注册</span></el-link>
                    </el-col>
                  </el-row>
                </div>
                <el-button  @keyup.down.enter="alert('123')" @click="loginHandler" style="height: 50px;border: none;border-radius: 30px;background:#247ff2;color:#ffffff; width: 100%;margin-top: 15px">立即登录</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
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
      },
      img:require("@/assets/loginhead.png")
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
          router.push({path: '/EntryForm'})
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

.divtitle{
  height: 200px;
  width: 436px;
  margin: 0 auto;
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
}

.div2{
  position: relative;
  margin: auto auto;
  width: 400px;

  .div3{
    position: absolute;
    top: 400px;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.1);
    height: 220px;
    padding: 40px 30px 30px 30px;

  }
}

.div1 {
  background-image:url("@/assets/login.jpg");
  background-size: 1920px;
  height: 100vh;
}


</style>
