<template>
  <div class="div1">
    <div style="text-align: left;color:#edd2d2;height: 80px;font-size: 42px;line-height: 80px;padding-left: 30px;font-weight: bold">
      请联系管理员重置密码
    </div>
  </div>
</template>


<script>

import {login, systemCaptcha} from "@/api/api";
import {useStore} from 'vuex'
import router from "@/router";
import {User,Lock,View} from "@element-plus/icons-vue";


export default {
  name: "ForgotPassword",
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
        role:'用户'
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
          router.push({path: '/PersonalCenter'})
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


.div2{
  position: relative;
  margin: auto auto;
  width: 400px;
  .div3{
    position: absolute;

    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.div1 {
  background-image:url("@/assets/login.jpg");
  background-size: 1920px;
  height: 100vh;
}

.el-card{
  background: rgba(255, 255, 255,  0.5);
}


</style>
