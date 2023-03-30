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
                  <el-form class="div-form" model="form" :disabled="disabled">
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
                    <el-form-item label="性别：">
                      <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="简介：">
                      <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="学校：">
                      <el-input v-model="form.school"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                      <el-input type="password" show-password v-model="form.password"></el-input>
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
              <span class="pin-lun">我的资源</span>
            </template>
            <el-row>
              <el-col>
                <el-row :gutter="12">
                  <el-col v-bind:key="item.id" v-for="item in list" :span="6">
                    <div class="div">
                      <el-card shadow="hover" @click="fileDetail(item)">
                        <div>
                          <div>
                            <img :src="item.cover" width="250">
                          </div>
                          <div>
                            {{ item.title }}
                          </div>
                          <div class="card-div">
                            <div>
                              {{ item.createTime }}
                            </div>
                            <div>
                              <el-icon>
                                <View/>
                              </el-icon>
                              {{ item.times }}
                            </div>
                            <div>
                              <el-icon>
                                <Comment/>
                              </el-icon>
                              {{ item.commentNum }}
                            </div>
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


import {Comment, View} from "@element-plus/icons-vue";
import router from "@/router";
import {resourcesApi, systemCurrentUser, sysUserApi} from "@/api/api";

export default {
  name: "PersonalCenter",
  components: {Comment, View},
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


    fileDetail(item) {
      console.log(item)
      let routeData = router.resolve({path: '/FileDetail', query: {id: item.id}});
      window.open(routeData.href, '_blank');
      // router.push({path:"/FileDetail",query:{id:item.id}})
    },
    initList() {
      resourcesApi.listAll()
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