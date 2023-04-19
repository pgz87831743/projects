<template>
  <div class="div">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="pin-lun">教学分享</span>
        </div>
      </template>
      <div class="row-div">
        <el-row :gutter="12" >
          <el-col v-bind:key="item.id" v-for="item in list" :span="6">
            <el-card shadow="hover" style="margin: 10px">

                <div>
                  <img :src="item.img" height="300">
                </div>
                <el-form>
                  <el-form-item label="标题:">
                    {{item.title}}
                  </el-form-item>
                  <el-form-item label="发布时间:">
                    {{item.createTime}}
                  </el-form-item>
                  <el-form-item >
                    <el-link type="primary" :href="'/NewsInfo?id='+item.id" target="_blank"> 查看详细</el-link>
                  </el-form-item>
                </el-form>
            </el-card>
          </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>

<script>
import {newsApi} from "@/api/api";

export default {
  name: "Teaching",
  data() {
    return {
      list:[]
    }
  },
  methods: {
    initList(){
      newsApi.listAll()
          .then((resp)=>{
            this.list=resp.data.data;
          })
    }
  },
  mounted() {
      this.initList()
  }
}
</script>

<style scoped lang="scss">

</style>