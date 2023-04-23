<template>
  <div class="p-div">
    <div v-if="this.memberInfo">
      <p style="text-align: left;font-weight: bold">Existing membership</p>
      <el-row :gutter="20">
        <el-col :span="3">{{ memberInfo.name }} membership</el-col>
        <el-col :span="3">expire at {{ memberInfo.end }}</el-col>
        <el-col :span="3" :offset="15">
          <el-button @click="Cancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>

    <div>
      <p style="text-align: left;font-weight: bold">Add membership</p>
      <el-row :gutter="20">
        <el-col :span="8" @click="getMember"><img :src="img[0]"></el-col>
        <el-col :span="8" @click="getMember"><img :src="img[1]"></el-col>
      </el-row>
    </div>
  </div>


</template>


<script>


import {membershipApi} from "@/api/api";

export default {
  name: "MembershipInfo",
  data() {
    return {
      img: [
        require("@/assets/img_4.png"),
        require("@/assets/img_5.png"),
      ],
      memberInfo: {}
    }
  },

  methods: {

    initMemberShip() {
      membershipApi.getMemberByUserName()
          .then((resp) => {
            this.memberInfo = resp.data.data

          })
    },

    Cancel() {
      membershipApi.deleteById(this.memberInfo.id)
          .then(()=>{
            this.initMemberShip()
          })
    },
    getMember(){
      window.location.href='/MemberShip'
    }

  },
  mounted() {
    this.initMemberShip()
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

