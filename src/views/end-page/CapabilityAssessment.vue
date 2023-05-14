<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="11">
        <div style="width: 100%;height:700px" id="dkqj1"></div>
      </el-col>

      <el-col :span="11">
        <div style="width: 100%;height: 700px" id="dkqj2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {staticApi} from "@/api/api";

export default {
  name: "CapabilityAssessment",
  data() {
    return {}
  },
  methods: {
    initCarStaticInfo() {
      staticApi.carStaticInfo()
          .then((resp)=>{
            this.dkqj1(resp)
          })
    },

    initDriverStaticInfo() {
      staticApi.driverStaticInfo()
          .then((resp)=>{
            this.dkqj2(resp)
          })
    },

    dkqj1(resp) {
      let myChart = this.$echarts.init(document.getElementById("dkqj1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '用车月度统计',
          left: 'left'
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: resp.data.data.dimensions,
          source: resp.data.data.data
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: resp.data.data.series
      });
    },
    dkqj2(resp) {
      let myChart = this.$echarts.init(document.getElementById("dkqj2"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '司机月度能力评估',
          left: 'left'
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: resp.data.data.dimensions,
          source: resp.data.data.data
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: resp.data.data.series
      });
    },

  },
  mounted() {
    this.initCarStaticInfo()
    this.initDriverStaticInfo()
  }
}
</script>

<style scoped lang="scss">

</style>