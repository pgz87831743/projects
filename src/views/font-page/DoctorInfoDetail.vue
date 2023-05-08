<template>
  <div>
    <van-search disabled placeholder="请输入医生名" @click="searchClick"/>
    <div class="vc" v-for="item in doctorList" v-bind:key="item.id" >
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
          <div class="vc2" @click="doctorClick(item)">
            <p><span style="font-weight: bold;font-size: 18px">{{item.name}}&nbsp;&nbsp;</span ><span><van-tag type="primary">{{ item.jobTwo }}</van-tag></span></p>
            <p><span >坐诊医院&nbsp;&nbsp;</span ><span>{{item.hospital}}</span></p>
            <p><span >坐诊时间&nbsp;&nbsp;</span ><span>周一至周五</span></p>
            <p><span >预约电话&nbsp;&nbsp;</span ><span>{{item.phone}}</span></p>
            <p style="font-size: 12px;color:#999999">
              <van-text-ellipsis rows="2" :content="'擅长：'+item.goodAt" />
            </p>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {doctorInfoApi} from "@/api/api";
import router from "@/router";
import {showImagePreview} from "vant";

export default {
  name: "DoctorInfoDetail",
  data() {
    return {
      query: {},
      doctorList: []
    }
  },
  methods: {

    showImage(item){
      showImagePreview([item.img]);
    },

    initDoctorInfoList() {
      doctorInfoApi.listAllByMeansId(this.query.meanId)
          .then((resp) => {
            this.doctorList = resp.data.data
          })
    },
    doctorClick(item) {
      router.push({path: '/DoctorInfoDesc', query: {id: item.id}})
    },
    searchClick(){
      router.push({path: '/SearchPage'})
    },
  },
  mounted() {
    this.initDoctorInfoList();
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
  max-height: 190px;
  min-height: 190px;


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