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
              <span class="pin-lun">我发布的房源</span>
            </template>
            <el-table :data="list" border height="600" style="width: 100%"
                      :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                      :cell-style="{textAlign:'center'}">
              <el-table-column prop="title" label="标题"/>
              <el-table-column prop="price" label="价格(元每月)"/>
              <el-table-column prop="unitType" label="户型"/>
              <el-table-column prop="area" label="面积（平米）"/>
              <el-table-column prop="floorHeight" label="楼层高度"/>
              <el-table-column prop="direction" label="朝向"/>
              <el-table-column prop="communityName" label="小区名称"/>
              <el-table-column prop="address" label="地址"/>
              <el-table-column prop="times" label="浏览次数"/>
              <el-table-column prop="elevator" label="是否有电梯"/>
              <el-table-column prop="characteristics" :show-overflow-tooltip="true" label="房源特色"/>
              <el-table-column prop="img" label="房源照片">
                <template #default="scope">
                  <el-image :preview-teleported="true" :preview-src-list="[scope.row.img]" :src="scope.row.img"></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="createBy" label="发布人"/>
              <el-table-column prop="createTime" label="发布时间"/>
              <el-table-column label="操作" width="300px">
                <template #default="scope">
                  <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
                  <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
                  <el-button
                      size="small"
                      type="danger"
                      @click="clickButton('delete',scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
        <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">

          <el-form-item label="标题">
            <el-input v-model="dfrom.title" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="价格(元每月)">
            <el-input v-model="dfrom.price" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="户型">
            <el-input v-model="dfrom.unitType" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="面积（平米）">
            <el-input v-model="dfrom.area" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="楼层高度">
            <el-input v-model="dfrom.floorHeight" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="朝向">
            <el-input v-model="dfrom.direction" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="小区名称">
            <el-input v-model="dfrom.communityName" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="dfrom.address" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="是否有电梯">
            <el-input v-model="dfrom.elevator" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="房源特色">
            <el-input v-model="dfrom.characteristics" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="房源照片">
            <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                :data="{fileTypeEnum:'FILE'}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="files"
            >
              <img v-if="dfrom.img" :src="dfrom.img"  width="300" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>

          </el-form-item>
        </el-form>
        <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
        </template>
      </el-dialog>


    </div>
  </div>
</template>

<script>


import {hoursApi, systemCurrentUser, sysUserApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";

export default {
  name: "PersonalCenter",
  components: {Plus},

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

      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        formDisabled: true,
        optionValue: null
      },
      dfrom:{

      }


    }
  },
  methods: {

    handleAvatarSuccess(response){
      this.form.avatar=response[0].url
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        hoursApi.add(this.dfrom)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        hoursApi.updateById(this.dfrom)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        hoursApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.dfrom = resp.data.data
        })
      } else if (type === 'detail') {
        hoursApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.dfrom = resp.data.data
        })
      } else if (type === 'delete') {
        hoursApi.deleteById(row.id).then(() => {
          this.initList()
        })
      }
    },


    initList() {
      hoursApi.listAll()
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