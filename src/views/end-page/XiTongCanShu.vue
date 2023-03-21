<template>
  <div class="p-div">
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div>
              <h2>贷款人数</h2>
            </div>
          </template>
          <h1>{{ data.dkrs }}</h1>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div>
              <h2>逾期人数</h2>
            </div>
          </template>
          <h1>{{ data.yqrs }}</h1>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div>
              <h2>贷款总额</h2>
            </div>
          </template>
          <h1>{{ data.dkze }}</h1>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div>
              <h2>利息总额</h2>
            </div>
          </template>
          <h1>{{data.lxze}}</h1>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="dksj" style="width: 100%;height: 600px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="dkqj" style="width: 100%;height: 600px"></div>
        </el-card>
      </el-col>

    </el-row>
  </div>


</template>


<script>

import {loanStatistics} from "@/api/user";

export default {
  name: "XiTongCanShu",
  data() {
    return {
      data: {}
    }
  },
  components: {},
  methods: {
    dkqj() {
      let myChart = this.$echarts.init(document.getElementById("dkqj"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '贷款区间分布',
          right: 'right'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: this.data.dkqjfb,
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
    dksj() {
      let myChart = this.$echarts.init(document.getElementById("dksj"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '贷款时间分布',
          right: 'right'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: this.data.dksjfb,
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

    initStatistics() {
      loanStatistics().then((resp) => {
        this.data = resp.data.data
        this.dkqj()
        this.dksj()
      })
    }
  },
  mounted() {
    this.initStatistics();
  },

}
</script>


<style lang="scss" scoped>
.el-row:nth-child(1) {
  margin-top: 0;
}

.el-row {
  margin-top: 30px;
}


.paginationClass {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  text-align: center;
}


.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>
