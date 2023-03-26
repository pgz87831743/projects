<template>
  <div>
    <div class="div1">
      <div class="div2">
        场馆名字
      </div>
    </div>
    <div style="font-size:48px;margin-top: 50px ">
      Activity Name
    </div>
    <div class="div3">
      <table class="tb">
        <tr class="tb-tr">
          <td class="tb-tr-td"></td>
          <td class="tb-tr-td">{{ toDay(0) }}</td>
          <td class="tb-tr-td">{{ toDay(1) }}</td>
          <td class="tb-tr-td">{{ toDay(2) }}</td>
        </tr>
        <tr class="tb-tr"  v-for="item in tableDate" v-bind:key="item.id">
          <td class="tb-tr-td" >{{item.time}}</td>
          <td class="tb-tr-td" :style="{background:item.color}">{{item.status}}</td>
          <td class="tb-tr-td"></td>
          <td class="tb-tr-td"></td>
        </tr>
      </table>
      <el-button style="background: #e0592d;color: #ffffff" @click="confirmHandler">Confirm</el-button>
    </div>

  </div>
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  name: "StadiumDetail",

  data(){
    return{
      tableDate:[
        {
          id:"1",
          time:'9:00-10:00',
          status:'available',
          color:'#00c6ff'
        },
        {
          id:"2",
          time:'10:00-11:00',
          status:'unavailable',
          color:'#ff8c8c'
        },
        {
          id:"3",
          time:'11:00-12:00',
          status:'',
          color:'#ffffff'
        },
        {
          id:"4",
          time:'12:00-13:00',
          status:'',
          color:'#ffffff'
        }
      ]
    }
  },
  methods: {
    toDay(addDay) {
      let date = new Date()
      date.setDate(date.getDate() + addDay)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    confirmHandler(){
      ElNotification({
        title: 'Success',
        message: 'Appointment succeeded',
        type: 'success',
      })
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