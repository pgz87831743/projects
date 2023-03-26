<template>
  <div>
    <div class="div1">
      <div class="div2">
        Timetable
      </div>
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
          <td class="tb-tr-td">{{item.time}}</td>
          <td class="tb-tr-td">{{item.today}}</td>
          <td class="tb-tr-td">{{item.tomorrow}}</td>
          <td class="tb-tr-td">{{item.afterTomorrow}}</td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timetable",

  data(){
    return{
      tableDate:[
        {
          id:"1",
          time:"9:00-10:00",
          today:"游泳馆",
          tomorrow:"排球馆",
          afterTomorrow:"健身馆",
        },
        {
          id:"2",
          time:"10:00-11:00",
          today:"游泳馆",
          tomorrow:"排球馆",
          afterTomorrow:"健身馆",
        },
        {
          id:"3",
          time:"11:00-12:00",
          today:"游泳馆",
          tomorrow:"排球馆",
          afterTomorrow:"健身馆",
        },
        {
          id:"4",
          time:"12:00-13:00",
          today:"游泳馆",
          tomorrow:"排球馆",
          afterTomorrow:"健身馆",
        }
      ]
    }
  },
  methods: {
    toDay(addDay) {
      let date = new Date()
      date.setDate(date.getDate() + addDay)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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