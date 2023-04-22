<template>

  <div>
    <div class="div1"></div>
    <div class="div2">
      <div class="div3" v-for="item in listData" v-bind:key="item.id">
        <el-row :gutter="50">
          <el-col :span="12">
            <img :src="item.img" width="600">
          </el-col>
          <el-col :span="12">
            <div><h1>{{ item.name }}</h1></div>
            <div style="text-align: left;margin-top: 50px">Description</div>
            <el-divider/>
            <div style="min-height: 150px">
              {{ item.description }}
            </div>
            <div>
              <el-button style="width: 150px;color: #ffffff;background: #e0592d" round @click="bookHandler(item.id)">BOOK
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>


import router from "@/router";
import {stadiumApi} from "@/api/api";

export default {
  name: "FacilityAndAppointment",

  data() {
    return {
      listData: []
    }
  },
  methods: {
    bookHandler(id) {
      router.push({path: '/StadiumBooking',query:{'stadiuID':id}})
    },
    initStadiuList(){
      stadiumApi.listAll()
          .then((resp)=>{
            this.listData=resp.data.data
          })
    }
  },
  mounted() {
    this.initStadiuList()
  }
}
</script>

<style scoped lang="scss">

.div1 {
  background: url("@/../src/assets/faciBk.png");
  height: 440px;
}

.div2 {

  width: 70%;
  margin: 150px auto;
}

.div3 {
  margin-top: 200px;
}
</style>