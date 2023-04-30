<template>
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <el-form :model="form" label-position="right" label-width="150px" size="large">
          <el-form-item label="机构名称">
            <el-input v-model="form.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="机构级别">
            <el-input v-model="form.level" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker value-format="YYYY-MM-DD" v-model="form.startDate"></el-date-picker>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="4">
        <el-button type="primary" @click="createHandle">创建</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {deptApi} from "@/api/api";

export default {
  name: "CreateDept",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    createHandle() {
      deptApi.add(this.form)
          .then(() => {
            this.form = {}
          })
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">

</style>