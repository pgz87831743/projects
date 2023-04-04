<template>
  <div>

    <div class="div1">
      <div style="text-align: left;color:#ffffff;height: 80px;font-size: 42px;line-height: 80px;padding-left: 30px;font-weight: bold">
        基于springboot+vue实现的开机检测
      </div>
      <div>
        <div class="div2">
          <div class="div3">
              <el-card>
                <template #header>
                  <div style="font-size: 26px">
                    开机检测
                  </div>
                </template>
                <div>
                <el-button type="primary" @click="checkHandle">点击检测</el-button>
                </div>
              </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


import { ElMessageBox} from "element-plus";

export default {
  name: "LoginPage",



  data() {
    return {
      inputAge: '',
      result: ''
    }
  },

  methods: {
    checkHandle(){
      ElMessageBox.alert('您的电脑已开机', '提示', {
        confirmButtonText: '确定',
      })
    }
  },


}
</script>


<style lang="scss" scoped>


.div2{
  position: relative;
  margin: auto auto;
  width: 400px;
  .div3{
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.div1 {
  background-image:url("@/assets/pexels-oleksandr-pidvalnyi-1227513.jpg");
  background-size: 1920px;
  height: 100vh;
}


</style>
