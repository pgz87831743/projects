<template>
  <div>
    <div class="div">
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in top" :key="item">
          <img :src="item" width="930" >
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="div">
     <el-card>
       <template #header>
         <el-row>
           <el-col :span="3">
             <div style="font-size: 20px;font-weight: bold;">求助信息</div>
           </el-col>
         </el-row>
       </template>
       <div>
         <div>

         </div>
       </div>
     </el-card>
    </div>

  </div>
</template>

<script>



import {Search} from "@element-plus/icons-vue";

export default {
  name: "IndexPage",
  computed: {
    Search() {
      return Search
    }
  },
  data() {
    return {
      img: require("@/assets/a.png"),
      list: [],
      top:[
          require("@/assets/index1.jpg"),
          require("@/assets/index2.jpg"),
          require("@/assets/index3.jpg"),
          require("@/assets/index4.jpg"),
          require("@/assets/index5.jpg"),
      ]
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">




</style>