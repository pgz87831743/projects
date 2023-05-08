<template>
  <div>
    <van-search v-model="value" disabled placeholder="请输入医生名" @click="searchClick"/>
    <van-tree-select
        :active-id="activeId"
        :main-active-index="activeIndex"
        :items="items"
        @click-nav="onNavClick"
        @click-item="onItemClick"
    />
  </div>
</template>

<script>


import {meansApi} from "@/api/api";
import router from "@/router";

export default {
  name: "IndexPage",
  data() {
    return {
      value: '',
      items: [],
      activeIndex: 0,
      activeId: 0
    }
  },
  methods: {

    onNavClick(index) {
      console.log(index)
      const id = this.items[index]
      this.activeId = id.id
      this.activeIndex = index
    },

    onItemClick(item) {
      console.log(item.id)
      router.push({path: '/DoctorInfoDetail', query: {meanId: item.id}})
    },

    searchClick(){
      router.push({path: '/SearchPage'})
    },


    initItems() {
      meansApi.listAll()
          .then((resp) => {
            this.items = resp.data.data
          })
    }
  },
  mounted() {
    this.initItems()
  }
}
</script>

<style scoped lang="scss">

.d1 {
  background-color: #3296fa;
}

::v-deep(.van-sidebar){
  height: 100vh;
  background-color: #fafafa;
}


::v-deep(.van-tree-select__content){
  height: 100vh;
}


</style>