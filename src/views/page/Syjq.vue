<template>
  <div>
    <el-form :model="form">
      <el-form-item label="名称" :label-width="labelWidth">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="年龄" :label-width="labelWidth">
        <el-input  :model="form.age"/>
      </el-form-item>
      <el-form-item label="体重" :label-width="labelWidth">
        <el-input  :model="form.name"/>
      </el-form-item>
      <el-form-item label="喂食" :label-width="labelWidth">
        <el-input  :model="form.ws"/>
      </el-form-item>
      <el-form-item label="排便" :label-width="labelWidth">
        <el-input :model="form.pb" />
      </el-form-item>
      <el-form-item label="性别" :label-width="labelWidth">
        <el-input  :model="form.sex"/>
      </el-form-item>
      <el-form-item label="绝育情况" :label-width="labelWidth">
        <el-input  :model="form.jyqk"/>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

export default {
  name: "Syjq",
  data() {
    return {
      form:{name:"123123"},
    }
  },
  components: {},
  methods: {},
  mounted() {
  },

}
</script>


<style lang="scss" scoped>

</style>
