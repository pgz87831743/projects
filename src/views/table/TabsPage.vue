<template>
  <el-tabs type="border-card">
    <el-tab-pane label="培训信息维护报表生成界面"><PeiXunList></PeiXunList></el-tab-pane>
    <el-tab-pane label="培训信息维护界面"><pei-xun-data></pei-xun-data></el-tab-pane>
  </el-tabs>
  {{ $store.state.user }}
</template>


<script>

import PeiXunList from "@/views/table/PeiXunList";
import PeiXunData from "@/views/table/PeiXunData";
export default {
  name: "TabsPage",
  setup(){
    return{
    }
  },
  components: {PeiXunData, PeiXunList},
  methods: {},
  mounted() {
  },

}
</script>


<style lang="scss" scoped>

</style>
