<template>
  <div>
    <van-search disabled placeholder="请输入医生名" @click="searchClick"/>
    <div class="vc" >
      <van-row>
        <van-col :span="5">
          <div class="vc1">
            <van-image
                style="margin-top: 8px"
                round
                width="4rem"
                height="4rem"
                :src="item.img"
                @click="showImage(item)"
            />
          </div>
        </van-col>
        <van-col :span="19">
          <div class="vc2">
            <p><span style="font-weight: bold;font-size: 18px">{{item.name}}&nbsp;&nbsp;</span ><span><van-tag type="primary">{{ item.jobTwo }}</van-tag></span></p>
            <p style="font-size: 14px"><span >坐诊医院&nbsp;&nbsp;</span ><span>{{item.hospital}}</span></p>
            <p style="font-size: 14px"><span >工作单位&nbsp;&nbsp;</span ><span>{{item.hospital}}</span></p>
            <p style="font-size: 14px"><span >预约电话&nbsp;&nbsp;</span ><span>{{item.phone}}</span></p>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="vc" >
      <div class="vcd1">
        医生擅长
      </div>
      <div class="vcd2">
        {{item.goodAt}}
      </div>
    </div>

    <div class="vc" >
      <div class="vcd1">
        专业特长
      </div>
      <div class="vcd2">
        {{item.expertise}}
      </div>
    </div>

    <div class="vc" >
      <div class="vcd1">
        获得奖励
      </div>
      <div class="vcd2">
        {{item.rewards}}
      </div>
    </div>


    <div class="vc" >
      <div class="vcd1">
        学术成就
      </div>
      <div class="vcd2">
        {{item.achievements}}
      </div>
    </div>


    <div class="vc" >
      <div class="vcd1">
        其他方面
      </div>
      <div class="vcd2">
        {{item.other}}
      </div>
    </div>

  </div>
</template>

<script>
import {doctorInfoApi} from "@/api/api";
import router from "@/router";
import {showImagePreview} from "vant";

export default {
  name: "DoctorInfoDesc.vue",
  data() {
    return {
      query: {},
      item: {}
    }
  },
  methods: {

    showImage(item){
      showImagePreview([item.img]);
    },

    searchClick(){
      router.push({path: '/SearchPage'})
    },

    initDoctorDesc() {
      doctorInfoApi.getById(this.query.id)
          .then((resp) => {
            this.item = resp.data.data
          })
    }
  },
  mounted() {
    this.initDoctorDesc();
  },
  created() {
    this.query = this.$route.query
  }
}
</script>

<style scoped lang="scss">
.vc {
  background-color: #ffffff;
  border-radius: 8px 8px 8px 8px;
  width: 95%;
  margin: 10px auto;

  .vcd1{
    font-size: 18px;font-weight: bold; padding: 10px;
  }

  .vcd2{
    font-size: 14px;  padding: 10px;
  }

  .vc1 {
    width: 30px;
    height: 30px;
    margin: 10px;
  }

  .vc2 {
    line-height: 16px;
  }
}
</style>