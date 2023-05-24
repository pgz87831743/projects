<template>
  <div class="div">
    <el-row :justify="'center'" >
      <el-col :span="18">
        <el-card>
          <div>
            <img :src="item.img" width="480">
          </div>
          <div>
            <h1>{{item.title}}</h1>
          </div>
          <div>
            {{item.createTime}}
          </div>

          <div v-html="item.content"></div>
        </el-card>
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