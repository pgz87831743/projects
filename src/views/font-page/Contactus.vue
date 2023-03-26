<template>
  <div>
    <div class="div1">
      <div class="div2">
        <h1 style="font-size: 54px">About Us</h1>
        <p style="font-size: 20px"> Meet the amazing team behind this project and find out</p>
        <p style="font-size: 20px"> more about how we work.</p>
      </div>
    </div>
    <div class="div3">
      <el-row :gutter="30" justify="center">
        <el-col :span="8">
          <el-card>
            <div style="font-size: 40px;font-weight: bold;text-align: left">Send us a message</div>
            <p style="text-align: left">You can contact us with anything related </p>
            <p style="text-align: left">to our Products. We'll get in touch with</p>
            <p style="text-align: left">you as soon as possible.</p>
            <div style="margin-top: 50px">
              <el-form
                  label-position="top"
              >
                <el-form-item label="First name">
                  <el-input placeholder="First Name..."></el-input>
                </el-form-item>
                <el-form-item label="Email address">
                  <el-input placeholder="Email Here..."></el-input>
                </el-form-item>
                <el-form-item label="Phone">
                  <el-input placeholder="Number Here..."></el-input>
                </el-form-item>
                <el-form-item label="Your Message">
                  <el-input type="textarea" ></el-input>
                </el-form-item>
              </el-form>
              <el-button  style="width: 150px;color: #ffffff;background: #e0592d" round>Contact Us</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" >
          <div style="background: #f7f7f7;padding: 30px">
            <div v-for="item in list" v-bind:key="item.id" style="padding-top: 30px">
              <div>
                <img :src="item.img" style="float: left">
                <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">{{item.title}}</span>
              </div>
              <div style="clear:both"></div>
              <div style="text-align: left;margin-left: 40px;">
                <p v-for="p in item.desc" v-bind:key="p">{{p}}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>







<script>
export default {
  name: "Contactus",
  data(){
    return{
      list:[
        {
          id:"1",
          img:require("@/assets/c1.png"),
          title:"Find us at the office",
          desc:['Bld Mihail Kogalniceanu, nr. 8,','7652 Bucharest,','Romania']
        },
        {
          id:"2",
          img:require("@/assets/c2.png"),
          title:"Give us a ring",
          desc:['Michael Jordan','+40 762 321 762','Mon - Fri, 8:00-22:00']
        },
        {
          id:"3",
          img:require("@/assets/c3.png"),
          title:"Legal Information",
          desc:['Creative Tim Ltd.','VAT · EN2341241','IBAN · EN8732ENGB2300099123','Bank · Great Britain Bank']
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.hdv2-span{
  color: #ffffff;
  display: inline-block;
  padding: 30px;
}

.sc{
  color: #e0592d;
}

.hdv2{
  height: 80px;
  background: #333333;
}

.div3{
  width: 70%;
  margin: 100px auto;
}

.div1 {
  background: url("@/../src/assets/aboutus.png");
  height: 662px;
  position: relative;
  .div2{
    position: absolute;
    margin: auto auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    height: 300px;
    width: 50%;
    color: #ffffff;
  }
}

</style>