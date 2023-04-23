<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="11">
         <div id="ec1" style="width: 100%;height: 800px"></div>
      </el-col>
      <el-col :span="11">
        <div id="ec2" style="width: 100%;height: 800px"></div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {orderApi} from "@/api/api";

export default {
  name: "StatisticsInfo",
  data() {
    return {
      staticsPrice:{},
      staticsTime:{},
      series:[],
    }
  },
  methods: {

    dkqj1() {
      let myChart = this.$echarts.init(document.getElementById("ec1"));
      // 绘制图表
      myChart.setOption(  {
        title: {
          text: 'Venue usage time',
        },
        xAxis: {
          type: 'category',
          data: this.staticsPrice.key
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.staticsPrice.value,
            type: 'bar'
          }
        ]
      });
    },
    dkqj2() {
      let myChart = this.$echarts.init(document.getElementById("ec2"));
      // 绘制图表
      myChart.setOption(  {
        title: {
          text: 'Weekly income',
        },
        legend: {},
        tooltip: {},
        dataset: {
          source:  this.staticsTime.value
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series:  this.series
      });
    },

    initStaticsPrice(){
      orderApi.staticsPrice()
          .then((resp)=>{
            this.staticsPrice=resp.data.data
          this.series=  this.staticsPrice.value.map(()=>{
              return {type:'bar'}
            })
            this.dkqj1()
          })
    },
    initStaticsTimes(){
      orderApi.staticsStadium()
          .then((resp)=>{
            this.staticsTime=resp.data.data
            this.dkqj2()
          })
    }
  },
  mounted() {
    this.initStaticsPrice()
    this.initStaticsTimes()

  }
}
</script>

<style scoped lang="scss">

</style>