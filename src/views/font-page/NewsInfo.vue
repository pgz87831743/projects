<template>
  <div>
    <el-row :justify="'center'" >
      <el-col :span="18">
        <el-card>
          <div>
            <img :src="item.img">
          </div>
          <div>
            <h1>{{item.title}}</h1>
          </div>
          <div>
            {{item.eventTime}}
          </div>
          <div>
            {{item.eventType}}
          </div>
          <div v-html="item.description"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {cityEventApi} from "@/api/api";

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
      cityEventApi.getById(this.id)
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