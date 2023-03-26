<template>
  <div class="dv1">
    <div class="login">
      <el-row>
        <el-col :span="12">
          <div style="color: #ffffff">
            <div>
              <img :src="img[0]" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Professional</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;margin-top: 10px;line-height: 30px">
              We provide every customer with <br/>the most professional venues and <br/> lessons to improve your experience
            </div>
          </div>
          <div style="color: #ffffff;margin-top: 30px">
            <div>
              <img :src="img[1]" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Modernised</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;margin-top: 10px;line-height: 30px">
              We hold a series of modern sports  <br/>facilities and multimedia  <br/>entertainment facilities
            </div>
          </div>
          <div style="color: #ffffff;margin-top: 30px">
            <div>
              <img :src="img[2]" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Intimate</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;margin-top: 10px;line-height: 30px">
              We have very patient staffs and <br/> you can communicate with them if  <br/> you encounter any problems
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <el-card shadow="hover">
            <h1>Register</h1>
            <el-form>
              <el-form-item >
                <el-input  :prefix-icon="User"  v-model="user.nickName" size="large" placeholder="Nickname"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input  :prefix-icon="Lock" v-model="user.username"   size="large" placeholder="Account"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input  :prefix-icon="Lock" v-model="user.password"   size="large" placeholder="Password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input  :prefix-icon="Lock" v-model="user.confirmPassword"   size="large" placeholder="Confirm Password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-checkbox-group v-model="user.agree">
                  <el-checkbox label="I agree to the terms and conditions" name="type" />
                </el-checkbox-group>
              </el-form-item>
            </el-form>

            <el-button style="width: 50%;margin-top: 30px; border-radius: 30px;width: 100%;height:38px;color: #ffffff;background: #f96332"> Get Started</el-button>

          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>
</template>


<script>


export default {
  name: "RegisterPage",
  data() {
    return {

      user: {
        username: '',
        password: ''
      },
      img:[
          require('@/assets/register_1.png'),
          require('@/assets/register_2.png'),
          require('@/assets/register_3.png'),
      ]
    }
  },


}
</script>


<style lang="scss" scoped>

::v-deep(input::-webkit-input-placeholder) { color: rgb(0, 0, 0); }
::v-deep(input::-ms-input-placeholder) { color: #000000; }

::v-deep(.el-card){
  border: none;
}

::v-deep(.el-input__wrapper){
  border-radius: 30px;
}

.dv1{
  height: 100vh;
  background:url("@/../src/assets/register.png");
  position: relative;
  width: 100%;

  .login{
    position: absolute;
    height: 600px;
    width: 800px;
    margin: 0 auto;
    top: 130px;
    bottom: 0;
    left: 0;
    right: 0;
  }



}


</style>
