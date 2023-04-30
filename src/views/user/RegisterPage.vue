<template>
  <div>

    <div class="div1">
      <div
          style="text-align: left;color:#000000;height: 80px;font-size: 42px;line-height: 80px;padding-left: 30px;font-weight: bold">
        分级机构人员管理系统
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
                <el-col :span="24">
                  <el-form label-position="right" label-width="70">
                  <el-row :gutter="10">
                    <el-col :span="11">
                      <el-form-item label="用户名">
                        <el-input v-model="user.username" placeholder="请输入"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="联系方式">
                        <el-input v-model="user.phone" placeholder="请输入"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item label="密码">
                          <el-input v-model="user.password" type="password" show-password  placeholder="请输入"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="性别">
                          <el-radio-group v-model="user.sex">
                            <el-radio name="sex" label="男"></el-radio>
                            <el-radio name="sex" label="女"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item label="确认密码">
                          <el-input type="password" show-password   v-model="user.confirmPassword"
                                    placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="角色">
                          <el-select v-model="user.role" placeholder="请选择" class="sel">
                            <el-option value="ADMIN" label="管理员"/>
                            <el-option value="SALESMAN" label="业务员"/>
                            <el-option value="TREASURER" label="财务员"/>
                            <el-option value="ADMINISTRATIVE" label="行政员"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item label="真实姓名">
                          <el-input v-model="user.nickname" placeholder="请输入"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="机构">
                          <el-tree style="width: 300px;min-height:100px; max-height: 100px;overflow: auto"
                                   :data="deptTree"
                                   :props="defaultProps"
                                   ref="tree"
                                   @check-change="orgCheckChange"
                                   show-checkbox
                                   :check-strictly="true"
                                   node-key="id"
                          />
                        </el-form-item>

                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item label="身份证">
                          <el-input v-model="user.idCard" placeholder="请输入"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-row >
                          <el-col :span="12">
                            <el-form-item label="验证码">
                              <el-input  v-model="user.userCode" placeholder="请输入验证码"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="9">
                            <el-form-item>
                              <img :src="user.code" @click="changeCapHandler">
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>





                    <div>
                      <el-row>
                        <el-col :span="4">
                          <el-link type="primary" :underline="false" @click="toLoginHandler">去登陆</el-link>
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

import {deptApi, register, systemCaptcha} from "@/api/api";
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
      },
      deptTree: [],
      defaultProps:{
        children:'child',
        label:'name'
      },
      selectOrg:[]
    }
  },
  components: {},
  methods: {

    orgCheckChange(data, checked, indeterminate) {
      if (checked){
        this.$refs.tree.setCheckedKeys([data.id],false)
        this.user.dept=data.id
        console.log(indeterminate, '子树中选中状态')
      }else if(data.id===this.user.dept) {
        this.user.dept=null
      }

    },

    toLoginHandler() {
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

    initDeptTree(){
      deptApi.deptTree()
          .then((resp)=>{
            this.deptTree=resp.data.data
          })
    }
  },
  mounted() {
    systemCaptcha().then((resp) => {
      this.user = resp.data.data;
    })

    this.initDeptTree()
  },

}
</script>


<style lang="scss" scoped>


.div2 {
  position: relative;
  margin: auto auto;
  width: 1000px;

  .div3 {
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.div1 {
  background-image: url("@/assets/pexels-sora-shimazaki-5673502.jpg");
  background-size: 1920px;
  height: 100vh;
}

.el-card {
  background: rgba(255, 255, 255, 0.5);
}

.sel {
  width: 300px;
}
</style>
