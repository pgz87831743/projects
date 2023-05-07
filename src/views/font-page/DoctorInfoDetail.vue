<template>
  <div>
    <van-cell title="单元格" is-link  v-for="item in doctorList" v-bind:key="item.id" @click="doctorClick(item)" >
      <template #title>
        <van-row>
          <van-col span="8">
            <van-image
                width="100"
                height="100"
                :src="item.img"
            />
          </van-col>
          <van-col span="16">{{item.name}}</van-col>
        </van-row>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {doctorInfoApi} from "@/api/api";
import router from "@/router";

export default {
  name: "DoctorInfoDetail",
  data() {
    return {
      query:{},
      doctorList:[]
    }
  },
  methods: {
    initDoctorInfoList(){
      doctorInfoApi.listAllByMeansId(this.query.meanId)
          .then((resp)=>{
            this.doctorList=resp.data.data
          })
    },
    doctorClick(item){
      router.push({path: '/DoctorInfoDesc',query:{id:item.id}})
    }
  },
  mounted() {
    this.initDoctorInfoList();
  },
  created() {
    this.query=this.$route.query
  }
}
</script>

<style scoped lang="scss">

</style>