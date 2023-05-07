<template>
  <div>
    <div class="dv1" @click="searchClick">
      <div class="dv2">
        <van-icon name="search">请输入医生名</van-icon>
      </div>
    </div>
    <van-card
        :thumb="doctor.img"
    >
      <template #tags>
        <div data-v-5e0858e0="">
          <div data-v-5e0858e0="" style="font-weight: bold; font-style: normal;"><span data-v-5e0858e0="" style="font-size: 0.5rem;">张文论 </span><span
              data-v-5e0858e0="" class="van-ellipsis" style="font-size: 0.4rem;"> 外一科主任 </span></div>
          <span data-v-5e0858e0="" class="van-tag van-tag--plain van-tag--danger van-hairline--surround"
                style="margin: 0.02rem 0px;">主任医师</span>
          <div data-v-5e0858e0="" style=" font-style: normal; margin: 0.05rem 0px;"><span
              data-v-5e0858e0="" class="info-title" style=" font-style: normal;">出诊医院</span> 莱西市中医医院
          </div>
          <div data-v-5e0858e0="" style=" font-style: normal; margin: 0.05rem 0px;"><span
              data-v-5e0858e0="" class="info-title" style=" font-style: normal;">预约电话</span>
            55652001-8025
          </div>
          <div data-v-5e0858e0="" style=" font-style: normal; margin: 0.05rem 0px;">
            <div data-v-5e0858e0="" class="info-title"
                 style=" font-style: normal; width: 4em; float: left;">擅长
            </div>
            <div data-v-5e0858e0="" style="display: inline-block; float: right; width: 75%;">
              擅长外科疑难、急危重症疾病的诊治
            </div>
          </div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import {doctorInfoApi} from "@/api/api";
import router from "@/router";

export default {
  name: "DoctorInfoDesc.vue",
  data() {
    return {
      query: {},
      doctor: {}
    }
  },
  methods: {


    searchClick(){
      router.push({path: '/SearchPage'})
    },

    initDoctorDesc() {
      doctorInfoApi.getById(this.query.id)
          .then((resp) => {
            this.doctor = resp.data.data
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

</style>