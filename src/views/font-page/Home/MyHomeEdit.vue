<template>
  <div>
    <el-row>
      <el-col>
        <el-upload
            class="avatar-uploader"
            action="/api/file/upload"
            :data="{fileTypeEnum:'FILE'}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="files"
        >
          <img v-if="form.avatar" :src="form.avatar" width="150"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Camera />
          </el-icon>
        </el-upload>
      </el-col>
    </el-row>
    <el-row class="eldiv" justify="center">
      <el-col :span="12" >
        <el-form :model="form" :label-position="'top'">
          <el-form-item label="name">
            <el-input v-model="form.nickname" size="large" ></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input  v-model="form.email" size="large" ></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input type="number" v-model="form.phone" size="large" ></el-input>
          </el-form-item>
          <el-form-item label="Birthday">
            <el-date-picker v-model="form.birthday" value-format="YYYY-MM-DD" type="date" ></el-date-picker>
          </el-form-item>
          <el-form-item label="Credit Card">
            <el-input v-model="form.creditCard" size="large" ></el-input>
          </el-form-item>
          <el-button round class="con-btn" @click="saveUserInfo"><span style="font-size: 10px;padding: 50px">Save Changes</span>
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {sysUserApi} from "@/api/api";
import {getUser} from "@/utils/authutil";
import {Camera} from "@element-plus/icons-vue";

export default {
  name: "MyHomePage",
  components: {Camera},
  data() {
    return {
      form: {},
      user: {}
    }
  },
  methods: {

    handleAvatarSuccess(response) {
      this.form.avatar = response[0].url
    },


    initUser() {
      sysUserApi.getById(getUser().id)
          .then((resp) => {
            this.form = resp.data.data
          })
    },

    saveUserInfo(){
      sysUserApi.updateById(this.form)
          .then(()=>{
            this.initUser()
            window.location.href='/MyHomeEdit'
          })
    }
  },
  mounted() {
    this.initUser()
  }
}
</script>

<style scoped lang="scss">
.con-btn {
  background: #ff5f5f;
  color: #ffffff;

}

.eldiv {
  .el-form-item {
    margin: 50px;
  }

  * {
    font-size: 20px;
  }
}
.avatar-uploader-icon{
  font-size: 100px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
}

.hdv1 {
  height: 662px;
  background: url("@/../src/assets/od_1.png");
  color: #ffffff;
  font-size: 36px;
  position: relative;

  .hdv1_1 {

    position: absolute;
    left: 0;
    right: 0;
    top: 163px;
    bottom: 0;
  }
}
</style>