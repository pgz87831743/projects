<template>
    <div>
     <el-row>
       <el-col>
         <h1>{{item.title}}</h1>
         <p>
           发布人：{{item.createByUser.username}}
         </p>
         <p>
           浏览量：{{item.times}}
         </p>
         <p>
           发布时间：{{item.createTime}}
         </p>
         <el-divider />
         <p style="font-size: 20px;margin-top: 20px">
           {{item.content}}
         </p>
       </el-col>
     </el-row>

    </div>
</template>


<script>



export default {
  name: "NewsInfo",
  data() {
    return {
      item:{},
    }
  },
  components: {},
  methods: {},
  mounted() {

  },
  created() {
    this.item=JSON.parse(this.$route.query.item);
    console.log(this.item)
  }

}
</script>



<style lang="scss" scoped>

</style>
