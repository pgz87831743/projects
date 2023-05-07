<template>
  <div>
      <van-search
          v-model="value"
          show-action
          placeholder="请输入医生姓名"
          background="#3296fa"
          @search="onSearch"
          @cancel="onCancel"
          style="color: white"
      />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "SearchPage",
  data() {
    return {
      value:'',
    }
  },
  methods: {
    onSearch(){

    },
    onCancel(){
      router.go(-1)
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
::v-deep(.van-search__action){
  color: white !important;
}
</style>