<template>
  <div>
    <div class="div1">
      <div>
        <div class="div2">
           <div class="left_div">
             <div class="t1">
               欢迎登录!<br>
               <span style="font-size: 40px">
                 疑似未成年被侵害上报系统
               </span>
               <div style="width: 41px;height: 4px;background: white"></div>
             </div>
           </div>
          <div class="right_div">
            <div class="lgn1">用户登录</div>
            <div class="lgn2">
              <el-form :size="'large'">
                <el-form-item  >
                  <el-input
                      class="efi"
                      :prefix-icon="User"
                      v-model="user.username"
                      placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item  class="efi">
                  <el-input
                      class="efi"
                      type="password" show-password :prefix-icon="Lock" v-model="user.password"
                      placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item  class="efi">
                  <el-checkbox  v-model="check">记住密码</el-checkbox>
                </el-form-item>
              </el-form>

              <el-button type="primary" class="lgn3"  @click="loginHandler" style="background:#247ff2;color:#ffffff; width: 100%;margin-top: 10px">登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {login} from "@/api/api";
import {useStore} from 'vuex'
import router from "@/router";
import {User,Lock,View} from "@element-plus/icons-vue";
import {getItem, removeItem, setItem} from "@/utils/storage";
import {decrypt, encrypt} from "@/utils/request";
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
        password: ''
      },
      check:false
    }
  },
  components: {},
  methods: {

    registerHandler(){
      router.push({path: '/register'})
    },

    changeCapHandler(){
      this.user.username=getItem('username')
      this.user.password= getItem('password')
    },

    loginHandler() {
      this.user.username=encrypt(this.user.username)
      this.user.password=encrypt(this.user.password+'')
      login(this.user).then((resp => {
        if (resp.data.code === 200) {
          this.store.commit('setUser', resp.data.data)
          if (this.check){
            setItem('username',decrypt(this.user.username))
            setItem('password',decrypt(this.user.password))
          }else{
            removeItem('username')
            removeItem('password')
          }
          router.push({path: '/IndexPage'})
        }else{
          this.user.username=''
          this.user.password=''
        }
      }))
    },
  },
  mounted() {
    this.changeCapHandler()
  },

}
</script>

<style lang="scss" scoped>




.div1 {
  background-image:url("@/assets/login.png");
  background-size: 1920px;
  height: 100vh;
  position: relative;

  .div2{
    width: 1200px;
    height: 681px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);


    .left_div{
      width: 580px;
      height: 681px;
      background: linear-gradient(-36deg, rgba(191,220,244,0.1), rgba(59,135,206,0.98));

      float: left;

      .t1{
        font-size: 48px;
        font-weight: 500;
        color: white;
        margin-top: 230px;
        line-height: 80px;
        margin-left: 20px;
      }

    }

    .right_div{
      width: 620px;
      height: 681px;
      background: #FFFFFF;
      float: left;

      .lgn1{
        font-size: 30px;
        font-weight: bold;
        color: #33363A;
        text-align: center;

        margin-top: 50px;
      }

      .lgn2{
        font-size: 30px;
        font-weight: bold;
        color: #33363A;
        text-align: center;

        padding: 60px;
      }

      .lgn3{
        width: 500px;
        height: 60px;
        background: #2D7BCF;
        border-radius: 30px;
      }


    }

  }
}

.el-card{
  background: rgba(255, 255, 255,  0.5);
}

::v-deep(.el-input){
  border: none !important;
}

</style>
