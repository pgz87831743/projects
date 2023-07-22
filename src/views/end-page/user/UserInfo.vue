<template>
  <div class="p-div">

    <el-row>
      <el-col :span="12">
        <el-form :size="'large'">
          <el-form-item label="姓名">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input  v-model="form.phone"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-button type="primary" @click="changeUser">修改</el-button>

  </div>


</template>


<script>


import {systemCurrentUser, userApi} from "@/api/api";

export default {
  name: "Inspection",
  data() {
    return {
      form:{
        id:'',
        nickname:'',
        phone:'',
      }
    }
  },

  methods: {

    changeUser(){
      userApi.updateById(this.form)
          .then(()=>{
            this.initUser()
          })
    },
    initUser(){
      systemCurrentUser().then((resp)=>{
        this.form=resp.data.data
      })
    }

  },
  mounted() {
    this.initUser()
  },

}
</script>


<style lang="scss" scoped>
.el-row:nth-child(1) {
  margin-top: 0;
}

.el-row {
  margin-top: 30px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.paginationClass {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  text-align: center;
}


.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>
