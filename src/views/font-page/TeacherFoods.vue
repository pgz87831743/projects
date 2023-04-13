<template>
  <div class="div">
    <el-card class="box-card">
      <template #header>
        <div>
          <el-row>
            <el-col :span="1">
              <el-button type="primary" @click="caculate">计算</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
      <el-descriptions title="教师饮食管理" :column="3" border>
        <el-descriptions-item label="体重">
          <el-input type="number" v-model="form.weight" placeholder="kg"/>
        </el-descriptions-item>
        <el-descriptions-item label="身高">
          <el-input type="number" v-model="form.height" placeholder="cm"/>
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          <el-input type="number" v-model="form.age" placeholder="岁"/>
        </el-descriptions-item>

        <el-descriptions-item label="运动量">
          <el-radio-group v-model="form.exercise">
            <el-radio label="1">轻度</el-radio>
            <el-radio label="2">中度</el-radio>
            <el-radio label="3">重度</el-radio>
          </el-radio-group>
        </el-descriptions-item>

      </el-descriptions>

      <div>
        您当前目标热量值为：{{ this.power }}（千卡）
      </div>
    </el-card>

    <el-row>
      <el-col>
        <div id="ec2" style="width: 100%;height: 600px">

        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import {foodsApi} from "@/api/api";

export default {
  name: "TeacherFoods",
  data() {
    return {
      form: {},
      power: 0,
      list: []
    }
  },
  methods: {
    caculate() {
      foodsApi.power(this.form)
          .then((resp) => {
            this.power = resp.data.data
          })
    },

    initFoods() {
      foodsApi.listAll()
          .then((resp) => {
            this.list = resp.data.data
            this.dkqj()
          })
    },

    dkqj() {
      let myChart = this.$echarts.init(document.getElementById("ec2"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '食物热量参考图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}千卡'
        },
        toolbox: {
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.list.map((item)=>{return item.name})
        },
        series: [
          {
            name: '参考热量',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data:  this.list.map((item)=>{return {name:item.name,value:item.hotNum};})
          }
        ]
      })
    },

  },
  mounted() {
    this.initFoods()
  }
}
</script>

<style scoped lang="scss">

</style>