<template>
  <div class="div">
    <el-row :gutter="10" :justify="'center'">
      <el-col :span="11">
        <el-card>
          <div id="tj1" style="width: 100%;height: 600px">132</div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <div id="tj2"  style="width: 100%;height: 600px">123</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StatictsInfo",
  data() {
    return {}
  },
  methods: {

    show() {
      let myChart = this.$echarts.init(document.getElementById("tj1"));
      // 绘制图表
      myChart.setOption( {
        title: {
          text: '城市人口信息',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
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
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
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

  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped lang="scss">

</style>