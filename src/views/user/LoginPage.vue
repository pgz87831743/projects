<template>
  <div>

    <div class="div1">
      <div style="text-align: left;color:#ffffff;height: 80px;font-size: 42px;line-height: 80px;padding-left: 30px;font-weight: bold">
        健康莱西
      </div>
      <div>
        <div class="div2">
          <div class="div3">
              <el-card>
                <template #header>
                  <div style="font-size: 26px">
                    请登录
                  </div>
                </template>
                <el-row justify="center">
                  <el-col :span="20">
                    <el-form>
                      <el-form-item>
                        <el-input  :prefix-icon="User" v-model="user.username" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input  type="password" show-password :prefix-icon="Lock" v-model="user.password" placeholder="请输入密码"></el-input>
                      </el-form-item>
                      <el-row :gutter="10">
                        <el-col :span="15">
                          <el-form-item>
                            <el-input  :prefix-icon="View"  v-model="user.userCode" placeholder="请输入验证码"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item>
                            <img :src="user.code" @click="changeCapHandler">
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <el-button  @keyup.down.enter="alert('123')" @click="loginHandler" style="background:#247ff2;color:#ffffff; width: 100%;margin-top: 10px">登录</el-button>
                  </el-col>
                </el-row>
              </el-card>
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
      }
    }
  },
  components: {},
  methods: {


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
          router.push({path: '/UserManagement'})
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
  background-image:url("@/assets/pexels-simona-kidrič-2607544.jpg");
  background-size: 1920px;
  height: 100vh;
}


</style>
