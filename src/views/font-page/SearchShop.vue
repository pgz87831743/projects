<template>
  <div class="div">
    <div>
      <el-card shadow="hover" class="box-card">

        <template #header>
          <div class="card-header">

            <el-input
                v-model="searchParams"
                placeholder="请输入搜索内容"
                class="input-with-select"
            >
              <template #append>
                <el-button type="primary" @click="searchHandle">
                 搜索房源
                </el-button>
              </template>
            </el-input>
          </div>
        </template>

        <el-row :gutter="12">
          <el-col v-bind:key="item.id" v-for="item in list" :span="6">
            <el-card shadow="hover" @click="fileDetail(item)" style="margin: 10px">
              <div>
                <div>
                  <img :src="item.img" height="300">
                </div>
                <div v-html="  item.title ">

                </div>
                <div class="card-div">
                  <div>

                  </div>
                  <div>
                    <span style="color: #f50f0f;font-size: 26px">{{ item.price }}/每月</span>
                    <span style="font-size: 18px">-{{ item.area }}/平米</span>
                    <span style="font-size: 18px"> -{{ item.unitType }}</span>
                  </div>
                  <div>
                    <el-icon>
                      <View/>
                    </el-icon>
                    {{item.times}}
                  </div>

                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { View} from "@element-plus/icons-vue";
import router from "@/router";
import {hoursApi} from "@/api/api";

export default {
  name: "SearchResource",
  components: { View},
  data() {
    return {
      searchParams: '',
      list: []
    }
  },
  methods: {
    fileDetail(item) {
      let routeData = router.resolve({path: '/ProductDetail', query: {id: item.id}});
      window.open(routeData.href, '_blank');
    },

    searchHandle() {
      hoursApi.searchHours(this.searchParams)
          .then((resp) => {
            this.list = resp.data.data
          })
    },

  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
::v-deep(.box-card .el-card__header) {
  border: none;
}

.card-div {
  //background: aqua;
  height: 35px;
  margin-top: 10px;

  div {
    display: inline-block;
    float: left;
  }

  div:nth-child(2) {
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }

  div:nth-child(n+3) {
    float: right;
    font-size: 10px;
    line-height: 35px;
    margin: 0 5px;

  }
}

</style>


