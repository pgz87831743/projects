<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>培训信息维护界面</span>
      </div>
    </template>
    <el-form>
      <el-row  gutter="20">
        <el-col :span="8">
          <el-form-item label="培训对象">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训时间">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="培训标题">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  gutter="20">
        <el-col :span="8">
          <el-form-item label="培训类型">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训机构">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训课时">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  gutter="20">
        <el-col :span="8">
          <el-form-item label="培训讲师">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训部门">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训费用（元）">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="佐证原因">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="佐证资料">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="上传附件">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="其他说明">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-button type="primary">保存</el-button>
          <el-button type="warning">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>


<script>

export default {
  name: "PeiXunData",
  data() {
    return {}
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
</style>
