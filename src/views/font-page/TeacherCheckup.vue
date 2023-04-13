<template>
  <div class="div">
    <el-row :justify="'center'">
      <el-col :span="24">
        <el-card>
          <template #header>
            <h1>体检记录</h1>
          </template>
          <div class="tablecss">
            <el-table :data="tableData" height="250"  border style="width: 100%">
              <el-table-column prop="checkTim" label="体检时间" width="170"/>
              <el-table-column prop="sysUser.nickname" label="体检教师" width="100"/>
              <el-table-column prop="szy" label="舒张压"/>
              <el-table-column prop="ssy" label="收缩压"/>
              <el-table-column prop="tzzs" label="体重指数" width="100"/>
              <el-table-column prop="ytb" label="腰臀比"/>
              <el-table-column prop="niaosuan" label="尿素"/>
              <el-table-column prop="niaosu" label="尿酸"/>
              <el-table-column prop="jigan" label="肌酐"/>
              <el-table-column prop="gysz" label="甘油三酯" width="100"/>
              <el-table-column prop="dkc" label="胆固醇"/>
              <el-table-column prop="gdkc" label="高密度脂蛋白胆固醇" width="155"/>
              <el-table-column prop="ddkc" label="低密度脂蛋白胆固醇" width="155"/>
              <el-table-column prop="ptt" label="葡萄糖"/>
              <el-table-column prop="tys" label="同型半胱氨酸" width="110"/>
              <el-table-column prop="wlbdb" label="微量白蛋白" width="110"/>
              <el-table-column prop="njk" label="微量白蛋白/尿肌酐" width="150"/>
              <el-table-column prop="createTime" label="创建时间" width="170"/>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <div id="ec1">

      </div>
    </el-row>
  </div>
</template>

<script>
import {healthCheckupApi} from "@/api/api";

export default {
  name: "TeacherCheckup",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    initTeacherCheck() {
      healthCheckupApi.listAll()
          .then((resp) => {
            this.tableData = resp.data.data
          })
    }
  },
  mounted() {
    this.initTeacherCheck()
  }
}
</script>

<style scoped lang="scss">
.tablecss{
  max-height: 350px;
  overflow: auto;
}
</style>