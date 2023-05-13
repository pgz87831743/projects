<template>
  <div class="div">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-affix :offset="90">
            <el-card shadow="hover" class="box-card">
              <template #header>
                <span class="pin-lun">个人信息</span>
              </template>
              <el-row>
                <el-col>
                  <el-form class="div-form" model="form" :disabled="disabled"   label-width="100px">
                    <el-form-item>
                      <el-upload
                          class="avatar-uploader"
                          action="/api/file/upload"
                          :data="{fileTypeEnum:'FILE'}"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          name="files"
                      >
                        <el-avatar
                            :src="form.avatar"
                            :size="75"
                        />
                        <el-button style="margin-left: 20px">更换头像</el-button>
                      </el-upload>

                    </el-form-item>
                    <el-form-item label="昵称：">
                      <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名：">
                      <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系地址：">
                      <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                      <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码：">
                      <el-input type="password" show-password v-model="form.ymm"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：">
                      <el-input type="password" show-password v-model="form.xmm"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row justify="center">
                <el-col :span="6">
                  <el-button @click="disabled=false">编辑</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button @click="saveUserInfoHandle">保存</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-affix>
        </el-col>
        <el-col :span="18">
          <el-card shadow="hover" class="box-card">
            <template #header>
              <span class="pin-lun">我的订单</span>
            </template>
            <el-row>
              <el-col>
                <el-row :gutter="12">
                  <el-col v-bind:key="item.id" v-for="item in list" :span="6">
                    <div class="div">
                      <el-card shadow="hover">
                        <div>
                          <div>
                           <el-image :src="item.goodsOrderDetails[0].goods.cover"
                                     :preview-src-list="item.goodsOrderDetails.map(s=>s.goods.cover)"
                           ></el-image>
                          </div>
                          <div style="font-size: 10px;">
                           <el-form  label-width="80px">
                             <el-form-item label="下单时间:">
                               {{item.createTime}}
                             </el-form-item>
                             <el-form-item label="总价:">
                               {{item.priceNum.toFixed(2)}}元
                             </el-form-item>
                             <el-form-item label="查看详情:">
                               <el-link type="primary" :href="'/OrderDetail?id='+item.id" target="_blank">点击查看</el-link>
                             </el-form-item>

                           </el-form>
                          </div>
                        </div>
                      </el-card>

                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


import {goodsOrderApi, systemCurrentUser, sysUserApi} from "@/api/api";

export default {
  name: "PersonalCenter",

  data() {
    return {
      search: "",
      form: {
        name: "",
        sex: "",
        avatar: ""
      },
      disabled: true,
      list: []
    }
  },
  methods: {

    handleAvatarSuccess(response){
      this.form.avatar=response[0].url
    },


    initList() {
      goodsOrderApi.listAll()
          .then((resp) => {
            this.list = resp.data.data
          })
    },

    initUserInfo() {
      systemCurrentUser()
          .then((resp) => {
            this.form = resp.data.data
          })
    },


    saveUserInfoHandle() {
      sysUserApi.updateById(this.form)
          .then(() => {
              window.location.href='/PersonalCenter'
          })
    }
  },
  mounted() {
    this.initList()
    this.initUserInfo()
  }
}
</script>

<style scoped lang="scss">
::v-deep(.box-card .el-card__header) {
  //border: none;
}

.box-card{
  min-height: 600px;
}

::v-deep(.div-form) {

}

.card-div {
  //background: aqua;
  height: 35px;
  margin-top: 10px;

  div {
    display: inline-block;
    float: left;
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }

  div:nth-child(n+2) {
    float: right;
    margin: 0 5px;
  }

}

.upload-demo {
  margin-top: 24px;
  margin-left: 10px;
}
</style>