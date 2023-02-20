<template>
  <el-card class="box-card" >
    <template #header>
      <div class="card-header">
        <span>培训信息维护报表生成界面</span>
      </div>
    </template>
    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="dept" label="部门" width="180" />
      <el-table-column prop="obj" label="培训对象" />
      <el-table-column prop="title" label="培训标题" />
      <el-table-column prop="type" label="培训类型" />
      <el-table-column prop="fy" label="培训费用（元）" />
      <el-table-column prop="date" label="培训日期" />
      <el-table-column prop="ks" label="培训课时（h）" />
      <el-table-column prop="teacher" label="培训讲师" />
      <el-table-column prop="jg" label="培训机构" />
      <el-table-column prop="reason" label="培训原因" />
      <el-table-column prop="material" label="佐证资料" />
      <el-table-column prop="file" label="上传附件" />
      <el-table-column prop="note" label="其他说明" />
    </el-table>
  </el-card>
</template>
<script>

export default {
  name: "PeiXunList",
  data() {
    return {
      tableList:[
        {
          "id": 1,
          "dept": "销售部",
          "obj": "学生",
          "title": "如何买东西",
          "type": "线下",
          "fy": 128.76,
          "date": "2023-12-18 15:36",
          "ks": 5.6,
          "teacher": "老李",
          "jg": "黑马程序员",
          "reason": "培训",
          "material": "佐证资料",
          "file": "附件",
          "note": "说明"
        }
      ]
    }
  },
  components: {},
  methods: {},
  mounted() {
  },

}
</script>


<style lang="scss" scoped>
.card-header{
  text-align: left;
  color: blue;
  background: #c3dfb0;
  width: 200px;
  padding: 10px;
}
::v-deep .el-card__body{
  padding: 0;
}

::v-deep .el-table__header-wrapper{
  .cell{
    color: black;
    text-align: center;
    font-weight: bold;
  }
}

::v-deep .el-table__row{
  .cell{
    text-align: center;
  }
}
</style>
