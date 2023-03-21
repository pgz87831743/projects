<template>
<div class="div">
  <div>
  <el-card shadow="hover" class="box-card">

    <template #header>
      <div class="card-header">

        <el-input
            v-model="search"
            placeholder="请输入搜索内容"
            class="input-with-select"
        >
          <template #append>
            <el-button  ><el-icon><Search /></el-icon></el-button>
          </template>
        </el-input>
      </div>
    </template>

    <el-tabs
        type="card"
        class="demo-tabs"

    >
      <el-tab-pane label="图片" name="first">图片</el-tab-pane>
      <el-tab-pane label="文档" name="second">文档</el-tab-pane>
      <el-tab-pane label="音频" name="third">音频</el-tab-pane>
      <el-tab-pane label="视频" name="fourth">视频</el-tab-pane>
      <el-tab-pane label="压缩包" name="five">压缩包</el-tab-pane>
    </el-tabs>
  </el-card>
  </div>
</div>
</template>

<script>
import {Search} from "@element-plus/icons-vue";

export default {
  name: "SearchResource",
  components: {Search},
  data(){
    return{
      search:""
    }
  }
}
</script>

<style scoped>
::v-deep(.box-card .el-card__header){
  border: none;
}
</style>