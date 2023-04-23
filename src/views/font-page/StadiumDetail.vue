<template>
  <div>
    <div class="div1">
      <div class="div2">
        {{this.info.stadium.name}}
      </div>
    </div>
    <div style="font-size:48px;margin-top: 50px ">
      {{this.info.activity.name}}
    </div>
    <div class="div3">
      <table class="tb">
        <tr class="tb-tr">
          <td class="tb-tr-td"></td>
          <td class="tb-tr-td" v-for="item in info.dateList" v-bind:key="item">{{item }}</td>
        </tr>
        <tr class="tb-tr"  v-for="(item,index) in info.rangList" v-bind:key="item">
          <td class="tb-tr-td" >{{item}}</td>
          <td class="tb-tr-td" @click="order(t)" :style="{background:t.color}"  v-for="t in info.timeTableList[index]" v-bind:key="t">{{t.status}}</td>
<!--          <td class="tb-tr-td" :style="{background:item.color}">{{item.status}}</td>-->
<!--          <td class="tb-tr-td"></td>-->
<!--          <td class="tb-tr-td"></td>-->
        </tr>
      </table>
      <div>
        <h2>{{this.chose.rangStart}}-{{this.chose.rangEnd}}</h2>
      </div>
      <el-button style="background: #e0592d;color: #ffffff" @click="confirmHandler">Confirm</el-button>
    </div>

  </div>
</template>

<script>
import {ElNotification} from "element-plus";
import {appointmentApi, timetableApi} from "@/api/api";

export default {
  name: "StadiumDetail",

  data(){
    return{
      activityId:'',
      info:{
        stadium:{},
        activity:{},
        dateList:[],
        rangList:[],
        timeTableList:[]
      },
      chose:{}
    }
  },
  methods: {
    toDay(addDay) {
      let date = new Date()
      date.setDate(date.getDate() + addDay)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    confirmHandler(){

      if (this.chose.status==='available'){

        let data={
          timetableId:this.chose.id
        }
        appointmentApi
            .add(data)
      }else{
        ElNotification({
          title: 'error',
          message: 'Appointment fail unavailable',
          type: 'error',
        })
      }


    },
    initActivity(){
      timetableApi.tableByActivityId(this.activityId)
          .then((resp)=>{
            this.info=resp.data.data;
          })

    },
    order(t){
      this.chose=t
    }
  },
  mounted() {
    this.initActivity()
  },
  created() {
    this.activityId = this.$route.query.id
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