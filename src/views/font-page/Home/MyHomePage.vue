<template>
<div>
    <el-row  class="eldiv">
      <el-col :span="8" :offset="2">
        <el-form  :model="form">
          <el-form-item>
            <el-input v-model="form.nickName" size="large" :prefix-icon="Calendar" placeholder="Nickname"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.account" :prefix-icon="Calendar" placeholder="Account"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" :prefix-icon="Calendar" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.confirmPassword" :prefix-icon="Calendar" placeholder="Confirm Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.creditCard" :prefix-icon="Calendar" placeholder="CreditCard"></el-input>
          </el-form-item>

          <el-button round class="con-btn"><span style="font-size: 10px;padding: 50px">Confirm</span></el-button>
        </el-form>
      </el-col>
    </el-row>
</div>
</template>

<script>
import {Calendar} from "@element-plus/icons-vue";

export default {
  name: "MyHomePage",
  data(){
    return{
      form:{
        "nickName":"管理员",
        "account":"admin",
        "password":"123123",
        "confirmPassword":"123123",
        "creditCard":"6666212315645465",
      }
    }
  },
  computed: {
    Calendar() {
      return Calendar
    }
  }
}
</script>

<style scoped lang="scss">
.con-btn{
  background: #ff5f5f;
  color: #ffffff;

}
.eldiv{
  .el-form-item{
    margin: 50px;
  }
  margin-top: 50px;
  *{
    font-size: 20px;
  }
}
</style>