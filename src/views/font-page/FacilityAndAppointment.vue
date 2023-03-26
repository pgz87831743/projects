<template>

  <div>
    <div class="div1"></div>
    <div class="div2">
      <div class="div3" v-for="item in listData" v-bind:key="item.id">
        <el-row :gutter="50">
          <el-col :span="12">
            <img :src="item.img" width="600" >
          </el-col>
          <el-col :span="12">
            <div><h1>{{item.name}}</h1></div>
            <div style="text-align: left;margin-top: 50px">Description</div>
            <el-divider/>
            <div style="min-height: 150px">
              {{item.desc}}
            </div>
            <div>
              <el-button style="width: 150px;color: #ffffff;background: #e0592d" round @click="bookHandler">BOOK</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>


import router from "@/router";

export default {
  name: "FacilityAndAppointment",

  data() {
    return {
      listData: [
        {
          id: "1",
          img: require("@/assets/changguan1.png"),
          name: 'Swimming pool',
          desc: '场馆内容介绍\n' +
              '1\n' +
              '1\n' +
              '1'
        },
        {
          id: "2",
          img: require("@/assets/changguan2.png"),
          name: 'Fitness room',
          desc: '场馆内容介绍\n' +
              '1\n' +
              '1\n' +
              '1'
        }
        ,
        {
          id: "3",
          img: require("@/assets/changguan3.png"),
          name: 'Squash courts',
          desc: '场馆内容介绍\n' +
              '1\n' +
              '1\n' +
              '1'
        }
        ,
        {
          id: "4",
          img: require("@/assets/changguan4.png"),
          name: 'Sports hall',
          desc: '场馆内容介绍\n' +
              '1\n' +
              '1\n' +
              '1'
        }
      ]
    }
  },
  methods:{
    bookHandler(){
      router.push({path: '/StadiumBooking'})
    }
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

.div3{
  margin-top: 200px;
}
</style>