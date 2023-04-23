<template>
  <div>
    <p style="text-align: left">Payment</p>
    <div class="ediv" >
      <el-row justify="center" :gutter="20">
        <el-col :span="7">
          <el-card>
            <img :src="src[0]" @click="pay('Cash')">
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card>
            <img :src="src[1]"  @click="pay('AliPay')">
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="ediv" >
      <el-row justify="center" :gutter="20">
        <el-col :span="7">
          <el-card>
            <img :src="src[2]"  @click="pay('Wechat')">
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card>
            <img :src="src[3]"  @click="pay('Card')">
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import {membershipApi} from "@/api/api";

export default {
  name: "PayChose",
  data() {
    return {
      id:'',
      src:[
          require("@/assets/img.png"),
          require("@/assets/img_1.png"),
          require("@/assets/img_2.png"),
          require("@/assets/img_3.png"),
      ]
    }
  },
  methods: {
    pay(type){
      if (this.id === 'Annually' || this.id === 'Monthly') {
        let data = {
          name: this.id
        }
        membershipApi.add(data)
            .then(() => {
              window.location.href = '/MembershipInfo'
            })
      } else {
        router.push({path: '/Pay',query:{id:this.id,pay:type}})
      }

    }
  },
  mounted() {

  },
  created() {
    this.id = this.$route.query.id
  }
}
</script>

<style scoped lang="scss">
.ediv{
  margin: 20px 0 0 0;
}
</style>