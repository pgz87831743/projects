<template>
  <div class="div">
    <el-card :shadow="'hover'">
      <el-descriptions

          title="有偿求助"
          :column="1"
          :size="'large'"
          border

      >
        <template #extra>
          <el-button type="success" @click="submitHandle">发布</el-button>
        </template>
        <el-descriptions-item label="求助名称">
          <el-input v-model="form.name"/>
        </el-descriptions-item>
        <el-descriptions-item label="求助价格">
          <el-input type="number"  v-model="form.price"/>
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          <el-input type="number" v-model="form.phone"/>
        </el-descriptions-item>
        <el-descriptions-item label="联系人">
          <el-input v-model="form.person"/>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          <el-input v-model="form.address"/>
        </el-descriptions-item>
        <el-descriptions-item label="求助说明">
          <el-input type="textarea" v-model="form.description" :autosize="{minRows:10}"/>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
  </div>
</template>

<script>

import {paidHelpApi} from "@/api/api";

export default {
  name: "PaidHelpFont",

  data() {
    return {
      form: {},

    }
  },
  methods: {

    submitHandle() {
      paidHelpApi.add(this.form).then(() => {
        this.form = {}
      })
    }
  }
}
</script>

<style scoped lang="scss">

::v-deep(.el-descriptions__body > table > tbody > tr > td:nth-child(odd)) {
  text-align: center;
  width: 200px;
}


</style>