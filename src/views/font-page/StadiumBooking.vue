<template>
  <div>
    <div class="div1">
      <div class="div2">
        场馆名字
      </div>
    </div>

    <div style="margin-top: 50px ">
      <div  style="font-size:48px ">
        介绍
      </div>
      <div>
        场馆介绍+容量
        1
        1
        1
      </div>
    </div>

    <div style="font-size:48px;margin-top: 50px ">
      Activity Name
    </div>
    <div style="margin-top: 50px">
      <div v-for="item in list" v-bind:key="item.id" style="margin: 20px auto;height: 50px; width: 500px; border: 1px solid #f0f0f0;border-radius: 30px">
        <span style="display: inline-block;width: 150px;line-height: 50px">{{ item.name }}</span>
        <span style="display: inline-block;width: 150px;line-height: 50px">${{item.price}}</span>
        <span style="display: inline-block;width: 150px;line-height: 50px"><el-button @click="chooseHandler" round style="background: #b054ac;color: #ffffff">Choose</el-button></span>
      </div>

    </div>
    <div style="height: 200px">

    </div>


  </div>
</template>

<script>


import router from "@/router";

export default {
  name: "StadiumBooking",

  data(){
    return{
      list:[
        {
          id:'1',
          name:'General use',
          price:'10'
        },
        {
          id:'1',
          name:'Lane Swimming',
          price:'10'
        },
        {
          id:'1',
          name:'Lessons',
          price:'50'
        },
        {
          id:'1',
          name:'Team Events',
          price:'15/person'
        }
      ]
    }
  },
  methods: {
    chooseHandler(){
      router.push({path: '/StadiumDetail'})
    }
  }
}
</script>

<style scoped lang="scss">
.tb-tr-td{
  border: 1px solid #a6a3a3;
  padding: 30px;
  width: 180px;


}
.tb{
  border-collapse:collapse;
  margin: 30px auto;

}

.div3{
  margin: 100px auto;
  width: 100%;
}

.div1 {
  background: url("@/../src/assets/timetable.png");
  height: 662px;
  position: relative;

  .div2 {
    position: absolute;
    height: 60px;
    color: #ffffff;
    font-size: 60px;
    font-weight: bold;
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>