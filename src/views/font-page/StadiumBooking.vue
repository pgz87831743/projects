<template>
  <div>
    <div class="div1">
      <div class="div2">
        {{ this.stadium.name }}
      </div>
    </div>

    <div style="margin-top: 50px ">
      <div style="font-size:48px ">
        Description
      </div>
      <div>
        <p>
          capacity: {{this.stadium.capacity}}
        </p>
       <p>
         {{ this.stadium.description }}
       </p>
      </div>
    </div>

    <div style="font-size:48px;margin-top: 50px ">
      Activity Name
    </div>
    <div style="margin-top: 50px">
      <div v-for="item in stadium.activityList" v-bind:key="item.id"
           style="margin: 20px auto;height: 50px; width:750px; border: 1px solid #f0f0f0;border-radius: 30px">
        <span style="display: inline-block;width: 400px;line-height: 50px">{{ item.name }}</span>
        <span style="display: inline-block;width: 150px;line-height: 50px">${{ item.price }}{{item.unit}}</span>
        <span style="display: inline-block;width: 200px;line-height: 50px"><el-button @click="chooseHandler(item.id)" round style="background: #b054ac;color: #ffffff">Choose</el-button></span>
      </div>

    </div>
    <div style="height: 200px">

    </div>


  </div>
</template>

<script>


import router from "@/router";
import {stadiumApi} from "@/api/api";

export default {
  name: "StadiumBooking",

  data() {
    return {
      stadiuID: '',
      stadium: {}
    }
  },
  methods: {
    chooseHandler(id) {
      router.push({path: '/StadiumDetail',query:{id:id}})
    },

    initStadium() {
      stadiumApi.getById(this.stadiuID)
          .then((resp) => {
            this.stadium = resp.data.data
          })
    }
  },
  mounted() {
    this.initStadium()
  },
  created() {
    this.stadiuID = this.$route.query.stadiuID
  }
}
</script>

<style scoped lang="scss">
.tb-tr-td {
  border: 1px solid #a6a3a3;
  padding: 30px;
  width: 180px;


}

.tb {
  border-collapse: collapse;
  margin: 30px auto;

}

.div3 {
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