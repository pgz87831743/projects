<template>
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <el-form :model="form" label-position="right" label-width="150px" size="large">
          <el-form-item label="交易内容">
            <el-input v-model="form.content" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="交易金额">
            <el-input v-model="form.amount" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="交易人">
            <el-input v-model="form.person" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="交易时间">

            <el-date-picker type="datetime" value-format="YYYY-MM-DD HH:mm:ss" v-model="form.tradingTime"></el-date-picker>

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
import {transactionApi} from "@/api/api";

export default {
  name: "TransactionEntry",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    createHandle() {
      transactionApi.add(this.form)
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