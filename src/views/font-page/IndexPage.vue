<template>
  <div>
    <div class="bk1">
      <div class="zt">Fitness protects the future</div>
    </div>
    <div class="bk2">
      <div class="wz">Some of Our Facilities</div>
      <el-row  :justify="'center'" class="card">
        <el-col :span="6" v-for="item in detail" v-bind:key="item.id">
          <div>
            <div>
              <img :src="item.img">
            </div>
            <div>
              <h1>{{ item.name }}</h1>
            </div>
            <div>
              {{ item.description }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bk3">
      <div class="bk3_f1">Membership</div>
      <div class="bk3_f2">Be our VIP and have a noble experience!</div>
      <div class="bk_d3">
        <el-row :justify="'center'">
          <el-col :span="6">
            <div class="cd1">
              <div class="nr" style="font-size: 18px;color: #666666 ">Monthly</div>
              <div style="position: relative;">
                <span style="display: inline-block;position: absolute;left:0;right:80px">$</span><span
                  style="font-size: 48px;font-weight: bold">49</span><span style="font-size: 18px">/M</span>
              </div>
              <div class="nr">
                <span style="display: block;color: #666666;font-size:48px;font-weight: bold">10% off</span>
                <span style="display: block;color: #666666;font-size: 36px">for any</span>
                <span style="display: block;color: #666666;font-size: 36px">purchasing</span>
              </div>
              <div class="nr">
                <el-button type="danger" round class="btc1" @click="member">Get Started</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="cd2">
              <div class="nr" style="font-size: 18px">Annually</div>
              <div style="position: relative;">
                <span style="display: inline-block;position: absolute;left:0;right:105px">$</span><span
                  style="font-size: 48px;font-weight: bold">389</span><span style="font-size: 18px">/M</span>
              </div>
              <div class="nr">
                <span style="display: block;font-size:48px;font-weight: bold">15% off</span>
                <span style="display: block;font-size: 36px">for any</span>
                <span style="display: block;font-size: 36px">purchasing</span>
              </div>
              <div class="nr">
                <el-button type="danger" round class="btc2" @click="member">Get Started</el-button>
              </div>
            </div>
          </el-col>

        </el-row>
      </div>
    </div>
    <div class="bk4">
      <div >
        <el-row justify="center">
          <el-col :span="8" :offset="1">
            <div style="text-align: left;font-size: 40px;font-weight: bold;color: #ffffff;margin-top: 130px">Contact us</div>
            <div style="font-size: 20px;text-align: left;color: #ffffff;padding-top: 30px">Need help? Contact us through the <br/>information on the right</div>
          </el-col>
          <el-col :span="8" >
            <div>
              <div style="text-align: left;font-size: 24px;font-weight: bold;color: #ffffff;margin-top: 130px">Find us at the office</div>
              <div style="font-size: 20px;text-align: left;color: #ffffff;padding-top: 30px">Bld Mihail Kogalniceanu, nr. 8, <br/>7652 Bucharest,Romania</div>
            </div>
            <div>
              <div style="text-align: left;font-size: 24px;font-weight: bold;color: #ffffff;margin-top: 130px">Give us a ring</div>
              <div style="font-size: 20px;text-align: left;color: #ffffff;padding-top: 30px">Michael Jordan <br/>+40 762 321 762<br/>Mon - Fri, 8:00-22:00</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: "IndexPage",

  data() {
    return {
      detail: [
        {
          id: '1',
          img: require("@/assets/it1.png"),
          name: 'Swimming Pool',
          description: "This is Swimming Pool"
        },
        {
          id: '2',
          img: require("@/assets/it2.png"),
          name: 'Fitness Room',
          description: "This is Fitness Room"
        },
        {
          id: '3',
          img: require("@/assets/it3.png"),
          name: 'Sports hall',
          description: "This is Sports hall"
        },
      ],
    }
  },
  methods:{
    member(){
      window.location.href='/MemberShip'
    }
  }
}
</script>

<style scoped lang="scss">


::v-deep(.el-card){
  padding: 0;
}

.bk4{
  background: url("@/../src/assets/bg3.png");
  height: 703px;

}

.bk3 {
  background: url("@/../src/assets/index_bk2.png");
  height: 831px;

  .bk3_f1 {
    height: 40px;
    font-size: 40px;
    color: #ffffff;
    padding-top: 110px;
  }

  .bk3_f2 {
    color: #ffffff;
    padding-top: 40px;
  }

  .bk_d3 {
    margin-top: 80px;

    .cd2 {
      border: none;
      background: #f96332;
      color: #f0f0f0;
      height: 350px;
      padding: 40px;
      border-radius: 20px;
      margin-left: 50px;

      .nr {
        margin: 20px;
      }
    }

    .cd1 {
      border: none;
      background: #ffffff;
      height: 350px;
      padding: 40px;
      border-radius: 20px;
      margin-left: 50px;

      .nr {
        margin: 20px;
      }
    }


    .btc1 {
      background: #e0592d;
    }

    .btc2 {
      background: #ffffff;
      color: #e0592d;
    }



  }
}


.bk1 {
  height: 1104px;
  position: relative;
  background: url("@/../src/assets/Background-2.png");

  .zt {
    font-size: 72px;
    color: #ffffff;
    height: 72px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;
    position: absolute;
    margin: auto;
  }
}


.bk2 {
  height: 1044px;

  .wz {
    font-size: 40px;
    text-align: center;
    //background: burlywood;
    padding: 170px;
  }

  .card {
    text-align: center;
    border: none;
  }

}

</style>