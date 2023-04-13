<template>
  <div>
    <el-row  :gutter="10">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <h2>管理员</h2>
          </template>
          <h1>{{info.admin}}人</h1>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <h2>教师</h2>
          </template>
          <h1>{{info.teacher}}人</h1>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <h2>新闻</h2>
          </template>
          <h1>{{info.news}}篇</h1>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <h2>食物</h2>
          </template>
          <h1>{{info.foods}}样</h1>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {statics} from "@/api/api";

export default {
  name: "EndIndex",
  data(){
    return{
      info:{
        admin:5,
        teacher:3,
        news:100,
        foods:20
      }
    }
  },
  methods:{
    initStatics(){
      statics().then((resp)=>{this.info=resp.data.data})
    }
  },
  mounted() {
    this.initStatics()
  }
}
</script>

<style scoped lang="scss">

</style>