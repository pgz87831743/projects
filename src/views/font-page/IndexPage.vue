<template>
  <div>
    <div class="div">
      <el-carousel :interval="4000" type="card" height="450px">
        <el-carousel-item v-for="item in top" :key="item">
          <img :src="item" width="930">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="div">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="3">
              <div style="font-size: 20px;font-weight: bold;">城市事件</div>
            </el-col>
          </el-row>


          <div class="car-div" v-for="item in list" v-bind:key="item.id">
            <el-card>
              <div>
                <img :src="item.img" width="280">
              </div>
              <div>
                <el-form>
                  <el-form-item label="时间:">
                    {{item.eventTime}}
                  </el-form-item>
                  <el-form-item label="城市:">
                    {{item.city.name}}
                  </el-form-item>
                  <el-form-item label="标题:">
                    {{item.title}}
                  </el-form-item>
                  <el-form-item label="事件类型:">
                    {{item.eventType}}
                  </el-form-item>

                  <el-form-item label="">
                      <el-link type="primary" :href="'/NewsInfo?id='+item.id" target="_blank">查看详细</el-link>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>


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


import {cityEventApi} from "@/api/api";

export default {
  name: "IndexPage",
  data() {
    return {
      list: [],
      top: [
        require("@/assets/index1.jpg"),
        require("@/assets/index2.jpg"),
        require("@/assets/index3.jpg"),
        require("@/assets/index4.jpg"),
        require("@/assets/index5.jpg"),
      ]
    }
  },
  methods: {
    initNews() {
      cityEventApi.listAll()
          .then((resp)=>{
            this.list=resp.data.data
          })
    }
  },
  mounted() {
    this.initNews()
  }
}
</script>

<style scoped lang="scss">
.car-div {
  width: 400px;
  height: 450px;
  margin: 20px 30px;
  display: inline-block;
}

</style>