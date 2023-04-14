<template>
  <div>
    <el-row :justify="'center'" >
      <el-col :span="18">
        <div>
          <h1>{{item.title}}</h1>
        </div>
        <div>
          <h2>{{item.createTime}}</h2>
        </div>
        <div v-html="item.content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {newsApi} from "@/api/api";

export default {
  name: "NewsInfo",
  data() {
    return {
      item: '',
      id: ''
    }
  },
  methods: {
    initItem() {
      newsApi.getById(this.id)
          .then((resp) => {
            this.item = resp.data.data
          })
    }
  },
  mounted() {
    this.initItem()
  },
  created() {
    this.id = this.$route.query.id
  }
}
</script>

<style scoped lang="scss">

</style>