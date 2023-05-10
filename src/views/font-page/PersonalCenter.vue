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
                  <el-form class="div-form" model="form" :disabled="disabled" label-width="100px">
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
                    <el-form-item label="联系地址：">
                      <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                      <el-input v-model="form.phone"></el-input>
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
              <span class="pin-lun">诊断记录</span>
            </template>
            <el-table :data="tableData" border height="600" style="width: 100%"
                      :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                      :cell-style="{textAlign:'center'}">
              <el-table-column prop="status" label="状态"/>
              <el-table-column prop="msg" label="消息"/>
              <el-table-column prop="type" label="类型"/>
              <el-table-column prop="matchRatio" label="匹配率"/>
              <el-table-column prop="describe" label="描述"/>
              <el-table-column prop="recommend" label="建议"/>
              <el-table-column prop="img" label="舌头照片">
                <template #default="scope">
                  <el-image
                      style="width: 100px"
                      :src="scope.row.img"
                      :zoom-rate="1.2"
                      :preview-src-list="[scope.row.img]"
                      :initial-index="4"
                      :preview-teleported="true"
                      fit="cover"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间"/>
              <el-table-column prop="createBy" label="创建人"/>
              <el-table-column label="操作" width="300px">
                <template #default="scope">
                  <el-button
                      size="small"
                      type="danger"
                      @click="deleteRecord(scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>


import {recordApi, systemCurrentUser, sysUserApi} from "@/api/api";

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
      list: [],
      tableData: []
    }
  },
  methods: {

    handleAvatarSuccess(response) {
      this.form.avatar = response[0].url
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
            window.location.href = '/PersonalCenter'
          })
    },

    initTableData() {
      recordApi.listAll()
          .then(resp => {
            this.tableData = resp.data.data
          })
    },

    deleteRecord(row) {
      recordApi.deleteById(row.id).then(() => {
        this.initTableData()
      })
    },
  },
  mounted() {
    this.initUserInfo()
    this.initTableData()
  }
}
</script>

<style scoped lang="scss">
::v-deep(.box-card .el-card__header) {
  //border: none;
}

.box-card {
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