<template>
  <div>

    <div class="div1">
      <div
          style="text-align: left;color:#0030f2;height: 80px;font-size: 42px;line-height: 80px;padding-left: 30px;font-weight: bold">
       车位租赁管理系统
      </div>
      <div>
        <div class="div2">
          <div class="div3">
            <el-card>
              <template #header>
                <div style="font-size: 26px">
                  注册用户
                </div>
              </template>
              <el-row justify="center">
                <el-col :span="20">
                  <el-form>
                    <el-form-item>
                      <el-input :prefix-icon="User" v-model="user.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input type="password" show-password :prefix-icon="Lock" v-model="user.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input type="password" show-password :prefix-icon="Lock" v-model="user.confirmPassword" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：">
                      <el-radio-group v-model="user.role">
                        <el-radio label="USER" name="roleType">业主</el-radio>
                        <el-radio label="ADMIN" name="roleType">管理员</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-row :gutter="10">
                      <el-col :span="15">
                        <el-form-item>
                          <el-input :prefix-icon="View" v-model="user.userCode" placeholder="请输入验证码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9">
                        <el-form-item>
                          <img :src="user.code" @click="changeCapHandler">
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div>
                      <el-row >
                        <el-col :span="4">
                          <el-link type="primary" :underline="false" @click="toLoginHandler" >去登陆</el-link>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form>

                  <el-button @click="registerHandler"
                             style="background:#247ff2;color:#ffffff; width: 100%;margin-top: 10px">注册
                  </el-button>
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

import {register, systemCaptcha} from "@/api/api";
import {useStore} from 'vuex'
import router from "@/router";
import {Lock, User, View} from "@element-plus/icons-vue";


export default {
  name: "RegisterPage",
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
        code: '',
        confirmPassword: '',
        uuid: '',
        userCode: '',
      }
    }
  },
  components: {},
  methods: {


    toLoginHandler(){
      router.push({path: '/login'})
    },

    changeCapHandler() {
      systemCaptcha().then((resp) => {
        let data = resp.data.data
        this.user.code = data.code
        this.user.uuid = data.uuid
      })
    },

    registerHandler() {
      register(this.user).then((resp => {
        if (resp.data.code === 200) {
          router.push({path: '/login'})
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


.div2 {
  position: relative;
  margin: auto auto;
  width: 400px;

  .div3 {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.div1 {
  background-image:url("@/assets/pexels-photo-3422964.webp");
  background-size: 1920px;
  height: 100vh;
}

.el-card{
  background: rgba(255, 255, 255, 0.5);
}


</style>
