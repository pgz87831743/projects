<template>
  <div>
    <van-search
        v-model="value"
        show-action
        action-text="返回"
        placeholder="请输入医生名"
        @search="onSearch"
        @update:model-value="changeHandle"
        @cancel="onCancel"
        style="color: white"
    />

    <van-cell icon="search" @click="onItemClick(item)"  v-for="item in doctorList" v-bind:key="item.id">
     <template #title>
       <span v-html="item.name"></span>
     </template>
    </van-cell>

  </div>
</template>

<script>
import router from "@/router";
import {doctorInfoApi} from "@/api/api";

export default {
  name: "SearchPage",
  data() {
    return {
      value:'',
      doctorList:[]
    }
  },
  methods: {
    onSearch(){

    },

    onItemClick(item){
      router.push({path: '/DoctorInfoDesc', query: {id: item.id}})
    },

    changeHandle(e){
      console.log(e)
      if (e.trim()!==''){
        doctorInfoApi.listAllByName(e)
            .then((resp)=>{
              this.doctorList=resp.data.data
            })
      }
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

}
</style>