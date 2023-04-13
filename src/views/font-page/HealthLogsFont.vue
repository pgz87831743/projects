<template>
  <div class="div">

    <el-card class="box-card">
      <template #header>
        <div>
          <el-row>
            <el-col :span="4" :offset="18">
              <el-date-picker v-model="time" value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" @click="search">查询</el-button>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" @click="submit">记录</el-button>
            </el-col>
          </el-row>
        </div>
      </template>

      <el-descriptions title="我的健康日志" :column="3" border>
        <el-descriptions-item label="睡眠时间">
          <el-input type="number" v-model="form.sleepTime" placeholder="小时"/>
        </el-descriptions-item>
        <el-descriptions-item label="心情">
          <el-input v-model="form.mood" placeholder="好、坏"/>
        </el-descriptions-item>
        <el-descriptions-item label="抽烟">
          <el-input type="number" v-model="form.smoke" placeholder="只"/>
        </el-descriptions-item>
        <el-descriptions-item label="体重">
          <el-input type="number" v-model="form.weight" placeholder="kg"/>
        </el-descriptions-item>
        <el-descriptions-item label="压力">
          <el-input v-model="form.pressure" placeholder="有、无"/>
        </el-descriptions-item>
        <el-descriptions-item label="高压">
          <el-input type="number" v-model="form.bpH"/>
        </el-descriptions-item>
        <el-descriptions-item label="底压">
          <el-input type="number" v-model="form.dbL"/>
        </el-descriptions-item>
        <el-descriptions-item label="血糖">
          <el-input type="number" v-model="form.bloodSugar"/>
        </el-descriptions-item>
        <el-descriptions-item label="吃的食物">
          <el-checkbox-group v-model="form.eatFood">
            <el-checkbox :label="item.name" name="type" v-for="item in foodList" v-bind:key="item.id"/>
          </el-checkbox-group>
        </el-descriptions-item>
        <el-descriptions-item label="日志内容">
          <MyEditor @onChange="onChange" :value="form.content"></MyEditor>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

  </div>
</template>

<script>
import {foodsApi, healthLogsApi} from "@/api/api";
import MyEditor from "@/views/components/MyEditor.vue";

export default {
  name: "HealthLogsFont.vue",
  components: {MyEditor},
  data() {
    return {
      time:'',
      form: {},
      foodList: [],
    }
  },
  methods: {
    search() {

      healthLogsApi.searchOne(this.time)
          .then((resp) => {
            this.form = resp.data.data
          })
    },
    submit() {
      healthLogsApi.add(this.form)
          .then(() => {
            this.form = {}
          })
    },


    onChange(value) {
      this.form.content = value
    },


    initFoodList() {
      foodsApi.listAll()
          .then((resp) => {
            this.foodList = resp.data.data
          })
    },
  },
  mounted() {
    this.initFoodList()
  }
}
</script>

<style scoped lang="scss">

</style>