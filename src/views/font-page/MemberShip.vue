<template>
  <div>
    <div class="div1">
      <div class="div2">
        Let’s get premium experience!
      </div>
    </div>
    <div class="div3">
      <p>To be our VIP, you will need to choose a plan for your needs. You can can</p>
      <p> cancel membership in 7 days for free.</p>
    </div>

    <div class="div4">
      <div class="div5">
        <el-row :justify="'center'">
          <el-col :span="5">
            <div class="cd2">
              <div class="nr" style="color:#999999;font-size: 18px">Monthly</div>
              <div>
                <div
                    style="height: 44px; width:44px;margin:0 auto;box-shadow: 5px 10px 30px #d0ecff;border-radius: 44px">
                  <img :src="require('@/assets/mbt1.png')">
                </div>
              </div>
              <div style="position: relative;margin-top: 20px">
                <span style="color: #333333;display: inline-block;position: absolute;left:0;right:90px">$</span><span
                  style="color:#333333;font-size: 48px;font-weight: bold">49</span>
              </div>
              <div class="nr">
                <span style=" color: #666666;display: block;font-size:48px;font-weight: bold">10% off</span>
                <span style=" color: #666666;display: block;font-size: 36px">for any</span>
                <span style="color: #666666;display: block;font-size: 36px">purchasing</span>
              </div>
              <div class="nr">
                <el-button  round style="background: #ff3636;color: #ffffff">Get Started</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="cd2">
              <div class="nr" style="color:#999999;font-size: 18px">Annually</div>
              <div>
                <div
                    style="height: 44px; width:44px;margin:0 auto;box-shadow: 5px 10px 30px #d0ecff;border-radius: 44px">
                  <img :src="require('@/assets/mbt2.png')">
                </div>
              </div>
              <div style="position: relative;margin-top: 20px">
                <span style="color: #333333; display: inline-block;position: absolute;left:0;right:105px">$</span><span
                  style="color:#333333;font-size: 48px;font-weight: bold">299</span>
              </div>
              <div class="nr">
                <span style="color: #666666; display: block;font-size:48px;font-weight: bold">20% off</span>
                <span style=" color: #666666;display: block;font-size: 36px">for any</span>
                <span style="color: #666666;display: block;font-size: 36px">purchasing</span>
              </div>
              <div class="nr">
                <el-button  round style="background: #18ce0f;color: #ffffff;">Get it now</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="div6">
      <div style="font-size: 40px">Frequently Asked Questions</div>
    </div>

    <div class="div7">
      <div class="div8">
        <el-row :justify="'center'">
          <el-col :span="6">
            <div>
              <img :src="require('@/assets/mbf1.png')" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Can I cancel my subscription?</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;">
             <p>Yes, you can cancel and perform other <br/>actions on your subscriptions via the <br/> My Account page.</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <img :src="require('@/assets/mbf2.png')" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Is there any discount for an annual</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;">
              <p>Yes, we offer a 35% discount if you<br/> choose annual subscription for any <br/>plan.</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="div8">
        <el-row :justify="'center'">
          <el-col :span="6">
            <div>
              <img :src="require('@/assets/mbf3.png')" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Which payment methods do you take?</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;">
              <p>AliPay、Wechat Pay、 Card Payment</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <img :src="require('@/assets/mbf4.png')" style="float: left">
              <span style="margin-left: 10px;display: inline-block;float:left;font-size: 20px;height: 40px;line-height: 34px">Any other questions we can answer?</span>
            </div>
            <div style="clear:both"></div>
            <div style="text-align: left;margin-left: 40px;">
              <p>We are happy to help you. Contact us.</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "MemberShip",


  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="scss">

.div8{
  margin: 100px;
}

.div5 {
  .cd2 {
    color: #f0f0f0;
    height: 400px;
    border-radius: 20px;
    margin: 70px;
    border: 2px solid #e7e7e7;

    .nr {
      margin: 20px;
    }
  }
}

.div3 {
  margin-top: 30px;
}


.div1 {
  height: 662px;
  background: url("@/assets/member.png");
  position: relative;

  .div2 {
    height: 100px;
    font-size: 54px;
    line-height: 54px;
    position: absolute;
    color: white;
    font-weight: bold;
    margin: auto auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

</style>