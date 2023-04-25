<template>
  <div class="div">
    <el-row :gutter="10" :justify="'center'">
      <el-col :span="11">
        <el-card>
          <div id="tj1" style="width: 100%;height: 600px"></div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card>
          <div id="tj2" style="width: 100%;height: 600px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {economyApi, populationApi} from "@/api/api";

export default {
  name: "StatictsInfo",
  data() {
    return {}
  },
  methods: {


    show(title,unit,data,id) {
    //  console.log(data)
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption( {
        title: {
          text: title,
          left: 'center'
        },
        tooltip: {
          formatter: function(params) {
            return '数据名称：' + params.name + '<br>' + '数据值：' + params.value+unit;
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data:data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },

    initPople(){
      populationApi.listAll()
          .then((resp)=>{
            this.show('城市人口数量','人',resp.data.data.map((item)=>{
              return{name:item.city.name,value:item.ageGroupOne}
            }),'tj1')
          })
    },
    initEconomy(){
      economyApi.listAll()
          .then((resp)=>{
            this.show('城市GDP','（亿）',resp.data.data.map((item)=>{
              return{name:item.city.name,value:item.gdp}
            }),'tj2')
          })
    }

  },
  mounted() {
    this.initPople()
    this.initEconomy()
  }
}
</script>

<style scoped lang="scss">

</style>