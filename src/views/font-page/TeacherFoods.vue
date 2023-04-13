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

  </div>
</template>

<script>
import {foodsApi} from "@/api/api";

export default {
  name: "TeacherFoods",
  data(){
    return{
      form:{},
      power:0
    }
  },
  methods:{
    caculate(){
      foodsApi.power(this.form)
          .then((resp)=>{
            this.power=resp.data.data
          })
    }
  }
}
</script>

<style scoped lang="scss">

</style>